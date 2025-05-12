
import { supabase } from "./client";

// Enable realtime for the likes table
const enableRealtimeForLikes = async () => {
  await supabase
    .rpc('supabase_functions.enable_realtime', {
      table_name: 'likes',
      schema: 'public'
    });
};

export { enableRealtimeForLikes };
