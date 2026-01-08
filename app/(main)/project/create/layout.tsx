import SuspenseLoader from "@/components/suspense-loader";
import { Suspense } from "react";

type Props={
  children:React.ReactNode
}

export default async function ProjectLayout({ children }:Props) {
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