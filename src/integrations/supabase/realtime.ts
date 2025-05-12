
import { supabase } from "./client";

// Enable realtime for the likes table
const enableRealtimeForLikes = async () => {
  await supabase
    .from('likes')
    .select('*')
    .limit(0); // This is a workaround to enable realtime for this table
};

export { enableRealtimeForLikes };
