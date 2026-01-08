import SuspenseLoader from "@/components/suspense-loader";
import React, { Suspense } from "react";

type Prop={
  children:React.ReactNode
}

export default async function ProjectLayout({ children }:Prop) {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Suspense fallback={<SuspenseLoader/>}>
        <div className="animate-in fade-in duration-700">
          {children}
        </div>
      </Suspense>
    </div>
  );
}