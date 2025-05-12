
import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface PageLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const PageLayout = ({ children, hideHeader = false }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && <Header />}
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default PageLayout;
