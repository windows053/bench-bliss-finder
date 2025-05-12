
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md z-40 border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-park-teal">ParkPause</h1>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
