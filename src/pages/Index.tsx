
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { enableRealtimeForLikes } from "@/integrations/supabase/realtime";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Enable realtime
    enableRealtimeForLikes().catch(console.error);
    
    if (!isLoading) {
      navigate(user ? "/" : "/auth");
    }
  }, [navigate, user, isLoading]);

  return null;
};

export default Index;
