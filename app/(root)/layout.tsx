import { onBoardUser } from "@/modules/auth/actions";
import Navbar from "@/modules/home/components/navbar";
import React from "react";

const RootLayout = async ({ children }: React.ComponentProps<"main">) => {
  await onBoardUser();

  return (
    <main className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Navbar  */}
      <Navbar />
      <div className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#dadde2_1px, transparent_1px)] bg-size:[16px_16px]" />

      <div className="flex-1 w-full my-20">
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
