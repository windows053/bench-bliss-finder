
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import MapPlaceholder from "@/components/MapPlaceholder";

const Discover = () => {
  return (
    <PageLayout>
      <div className="container mx-auto pt-4 h-[calc(100vh-120px)]">
        <MapPlaceholder />
      </div>
    </PageLayout>
  );
};

export default Discover;
