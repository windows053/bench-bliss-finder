
import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import BenchCard from "@/components/BenchCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

type Bench = {
  id: string;
  imageUrl: string;
  description: string;
  location: string;
  likes: number;
  comments: number;
  username: string;
  userAvatar: string;
  createdAt: string;
  isLiked: boolean;
};

const Home = () => {
  const [benches, setBenches] = useState<Bench[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // Function to handle like toggling from child components
  const handleLikeToggle = (benchId: string, isLiked: boolean) => {
    setBenches(prev => 
      prev.map(bench => 
        bench.id === benchId 
          ? { 
              ...bench, 
              isLiked, 
              likes: isLiked ? bench.likes + 1 : bench.likes - 1 
            } 
          : bench
      )
    );
  };

  // Fetch benches data
  useEffect(() => {
    const fetchBenches = async () => {
      try {
        setLoading(true);
        
        // For now, we'll use the mock data since we haven't set up the real data yet
        // In a real app, this would be replaced with a Supabase query
        const { data: benchData, error } = await supabase
          .from('benches')
          .select(`
            id,
            description,
            image_url,
            location,
            created_at,
            profiles(username, avatar_url)
          `)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Get like counts for each bench
        const benchIds = benchData.map(bench => bench.id);
        const { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('bench_id, count')
          .in('bench_id', benchIds)
          .select('bench_id')
          .order('bench_id');
          
        if (likesError) throw likesError;
        
        // Check if current user has liked each bench
        let userLikes: Record<string, boolean> = {};
        if (user) {
          const { data: userLikesData, error: userLikesError } = await supabase
            .from('likes')
            .select('bench_id')
            .eq('user_id', user.id)
            .in('bench_id', benchIds);
            
          if (userLikesError) throw userLikesError;
          
          userLikes = Object.fromEntries(
            (userLikesData || []).map(like => [like.bench_id, true])
          );
        }
        
        // Count likes for each bench
        const likeCounts: Record<string, number> = {};
        benchIds.forEach(id => { likeCounts[id] = 0 });
        
        if (likesData) {
          likesData.forEach(like => {
            if (like.bench_id in likeCounts) {
              likeCounts[like.bench_id]++;
            }
          });
        }
        
        // Count comments for each bench (this would be replaced with actual comment counts)
        const commentCounts: Record<string, number> = {};
        benchIds.forEach(id => { commentCounts[id] = 0 });
        
        // Format the data for our components
        const formattedBenches = benchData.map(bench => ({
          id: bench.id,
          imageUrl: bench.image_url,
          description: bench.description,
          location: bench.location || "Unknown location",
          likes: likeCounts[bench.id] || 0,
          comments: commentCounts[bench.id] || 0,
          username: bench.profiles?.username || "Anonymous",
          userAvatar: bench.profiles?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
          createdAt: new Date(bench.created_at).toLocaleDateString(),
          isLiked: !!userLikes[bench.id]
        }));
        
        setBenches(formattedBenches);
      } catch (error) {
        console.error("Error fetching benches:", error);
        toast.error("Failed to load benches");
      } finally {
        setLoading(false);
      }
    };

    fetchBenches();
    
    // Set up realtime subscription for likes changes
    const likesChannel = supabase
      .channel('public:likes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'likes' },
        (payload) => {
          // Refresh benches when likes change
          fetchBenches();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(likesChannel);
    };
  }, [user]);

  return (
    <PageLayout>
      <div className="container max-w-md mx-auto pt-4 px-0">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-4 border-park-teal border-t-transparent rounded-full"></div>
          </div>
        ) : benches.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No benches found. Be the first to share one!</p>
          </div>
        ) : (
          benches.map((bench) => (
            <BenchCard 
              key={bench.id} 
              {...bench} 
              onLikeToggle={handleLikeToggle}
            />
          ))
        )}
      </div>
    </PageLayout>
  );
};

export default Home;
