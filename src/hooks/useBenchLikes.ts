
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export function useBenchLikes() {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);

  const toggleLike = async (benchId: string, isLiked: boolean) => {
    if (!user) {
      toast.error("You must be logged in to like a bench");
      return { success: false };
    }

    try {
      setIsLiking(true);

      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("bench_id", benchId)
          .eq("user_id", user.id);

        if (error) throw error;
        return { success: true, liked: false };
      } else {
        // Add like
        const { error } = await supabase.from("likes").insert({
          bench_id: benchId,
          user_id: user.id,
        });

        if (error) throw error;
        return { success: true, liked: true };
      }
    } catch (error: any) {
      console.error("Error toggling like:", error);
      toast.error(error.message || "Failed to update like");
      return { success: false };
    } finally {
      setIsLiking(false);
    }
  };

  return {
    toggleLike,
    isLiking,
  };
}
