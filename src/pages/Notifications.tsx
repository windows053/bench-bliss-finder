
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-6 px-4 flex flex-col items-center justify-center h-[calc(100vh-120px)]">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Bell size={32} className="text-park-teal" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Stay updated with likes, comments, and follows once you connect TakeASeat to Supabase for authentication and notifications.
        </p>
      </div>
    </PageLayout>
  );
};

export default Notifications;
