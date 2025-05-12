
import React from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <Camera size={48} className="text-park-teal" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Capture a Bench Moment</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        ParkPause requires Supabase integration for camera functionality. 
        Connect to Supabase to enable real-time photo capture of your favorite benches.
      </p>
      <Button className="bg-park-teal hover:bg-park-teal/90">
        Enable Camera Access
      </Button>
    </div>
  );
};

export default CameraPlaceholder;
