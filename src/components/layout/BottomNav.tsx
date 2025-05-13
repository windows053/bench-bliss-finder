
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Camera, Bell, User } from "lucide-react";

type NavItem = {
  icon: React.ReactNode;
  path: string;
  isActive: boolean;
};

const BottomNav = () => {
  // We'll later connect this to the actual route
  const currentPath = window.location.pathname;

  const navItems: NavItem[] = [
    {
      icon: <Home size={24} />,
      path: "/",
      isActive: currentPath === "/",
    },
    {
      icon: <Search size={24} />,
      path: "/discover",
      isActive: currentPath === "/discover",
    },
    {
      icon: <Camera size={24} className="text-white" />,
      path: "/camera",
      isActive: currentPath === "/camera",
    },
    {
      icon: <Bell size={24} />,
      path: "/notifications",
      isActive: currentPath === "/notifications",
    },
    {
      icon: <User size={24} />,
      path: "/profile",
      isActive: currentPath === "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-violet-800 to-purple-600 border-t border-purple-700 flex justify-around items-center py-3 px-4 z-50">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-item ${item.isActive ? "active" : ""}`}
          aria-label={item.path.replace("/", "") || "home"}
        >
          {item.label === "Post" ? (
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-full -mt-5 shadow-md">
              {item.icon}
            </div>
          ) : (
            item.icon
          )}
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
