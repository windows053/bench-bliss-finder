
import React from "react";
import { MapPin } from "lucide-react";

const MapPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <MapPin size={48} className="text-park-teal" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Discover Benches Worldwide</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        ParkPause requires Supabase integration to enable our interactive world map
        with geotagged bench markers. Connect to Supabase to explore benches around you.
      </p>
      <div className="w-full max-w-md h-60 bg-muted/50 rounded-lg border-2 border-dashed border-muted flex items-center justify-center">
        <p className="text-muted-foreground">Map will appear here after Supabase integration</p>
      </div>
    </div>
  );
};

export default MapPlaceholder;
