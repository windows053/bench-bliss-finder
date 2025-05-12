
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import CameraPlaceholder from "@/components/CameraPlaceholder";

const Camera = () => {
  return (
    <PageLayout hideHeader={true}>
      <div className="container mx-auto pt-4 h-[calc(100vh-100px)]">
        <CameraPlaceholder />
      </div>
    </PageLayout>
  );
};

export default Camera;
