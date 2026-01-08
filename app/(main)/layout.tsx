// app/(main)/project/layout.jsx
import Header from "@/components/header";
import SuspenseLoader from "@/components/suspense-loader";
import { Suspense } from "react";

type Props={
  children:React.ReactNode
}

export default async function ProjectLayout({ children }:Props) {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Suspense
        fallback={
          <SuspenseLoader/>
        }
      >
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 h-screen overflow-y-auto overscroll-none">
            <div className="max-w-400 mx-auto">
              {children}
            </div>
          </main>
          <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[32px_32px] opacity-40" />
        </div>
      </Suspense>
    </div>
  );
}