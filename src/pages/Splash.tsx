
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a loading delay then navigate to home
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-park-teal to-park-teal/80 text-white p-4">
      <div className="animate-pulse-gentle">
        <h1 className="text-4xl font-bold mb-2">ParkPause</h1>
        <p className="text-center opacity-90">Find your perfect bench moment</p>
      </div>
    </div>
  );
};

export default Splash;
