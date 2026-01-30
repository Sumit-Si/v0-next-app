import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserButton />
    </div>
  );
};

export default Home;
