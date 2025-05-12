
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { User, Grid, Heart, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { benchData } from "@/data/benchData";

const Profile = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <User size={40} className="text-park-teal" />
          </div>
          <h2 className="text-xl font-semibold mb-1">John Bencher</h2>
          <p className="text-muted-foreground mb-4 flex items-center">
            <MapPin size={14} className="mr-1" /> San Francisco, CA
          </p>
          <div className="flex space-x-6 mb-6">
            <div className="text-center">
              <p className="font-semibold">128</p>
              <p className="text-xs text-muted-foreground">Benches</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">1.2k</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">284</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
          <div className="flex space-x-2 w-full max-w-xs mb-8">
            <Button className="flex-1 bg-park-teal hover:bg-park-teal/90">
              Connect to Supabase
            </Button>
            <Button variant="outline" size="icon">
              <Settings size={18} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts" className="flex items-center">
              <Grid size={16} className="mr-2" /> Posts
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center">
              <Heart size={16} className="mr-2" /> Liked
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <div className="grid grid-cols-3 gap-1">
              {benchData.map((bench) => (
                <div key={bench.id} className="aspect-square">
                  <img
                    src={bench.imageUrl}
                    alt="Bench"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="liked">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">
                Connect to Supabase to see liked benches
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profile;
