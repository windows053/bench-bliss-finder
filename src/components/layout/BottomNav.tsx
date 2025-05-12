
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Camera, Bell, User } from "lucide-react";

type NavItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
};

const BottomNav = () => {
  // We'll later connect this to the actual route
  const currentPath = window.location.pathname;

  const navItems: NavItem[] = [
    {
      icon: <Home size={24} />,
      label: "",
      path: "/",
      isActive: currentPath === "/",
    },
    {
      icon: <Search size={24} />,
      label: "Discover",
      path: "/discover",
      isActive: currentPath === "/discover",
    },
    {
      icon: <Camera size={24} className="text-white" />,
      label: "Post",
      path: "/camera",
      isActive: currentPath === "/camera",
    },
    {
      icon: <Bell size={24} />,
      label: "Alerts",
      path: "/notifications",
      isActive: currentPath === "/notifications",
    },
    {
      icon: <User size={24} />,
      label: "Profile",
      path: "/profile",
      isActive: currentPath === "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 z-50">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-item ${item.isActive ? "active" : ""}`}
        >
          {item.label === "Post" ? (
            <div className="bg-park-teal p-3 rounded-full -mt-5 shadow-md">
              {item.icon}
            </div>
          ) : (
            item.icon
          )}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
