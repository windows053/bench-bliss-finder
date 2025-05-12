
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Splash = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Simulate a loading delay then navigate based on auth status
    const timer = setTimeout(() => {
      navigate(user ? "/" : "/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, user, isLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-park-teal to-park-teal/80 text-white p-4">
      <div className="animate-pulse-gentle">
        <h1 className="text-4xl font-bold mb-2">TakeASeat</h1>
        <p className="text-center opacity-90">Find your perfect bench moment</p>
      </div>
    </div>
  );
};

export default Splash;
