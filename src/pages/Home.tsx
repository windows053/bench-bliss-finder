
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import BenchCard from "@/components/BenchCard";
import { benchData } from "@/data/benchData";

const Home = () => {
  return (
    <PageLayout>
      <div className="container max-w-md mx-auto pt-4 px-0">
        {benchData.map((bench) => (
          <BenchCard key={bench.id} {...bench} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
