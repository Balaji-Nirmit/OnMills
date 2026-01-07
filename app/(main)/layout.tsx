// app/(main)/project/layout.jsx
import Header from "@/components/header";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

type Props={
  children:React.ReactNode
}

export default async function ProjectLayout({ children }:Props) {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-8">
            {/* Minimalist Loader Container */}
            <div className="w-full max-w-100 space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-[#FF7A5C] uppercase tracking-[0.2em] leading-none">
                    Initializing
                  </span>
                  <span className="text-[14px] font-bold text-[#1D1D1F]">
                    Project_Module
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#86868B]">
                  SEC_01 // 88%
                </span>
              </div>

              {/* Refined BarLoader */}
              <div className="rounded-full overflow-hidden border border-[#F2F0EB]">
                <BarLoader
                  width={"100%"}
                  color="#FF7A5C"
                  height={6}
                  speedMultiplier={0.8}
                />
              </div>

              <p className="text-[11px] text-[#86868B] text-center font-medium animate-pulse">
                Synchronizing operational nodes with central relay...
              </p>
            </div>
          </div>
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