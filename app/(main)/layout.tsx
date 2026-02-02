// app/(main)/project/layout.jsx
import Header from "@/components/header";
import SuspenseLoader from "@/components/suspense-loader";
import { Suspense } from "react";
type Props = {
  children: React.ReactNode;
}
// Applying the "Vision Pro" interface constraints
export default async function ProjectLayout({ children }:Props) {
  return (
    // 1. Remove overflow-hidden from here to allow the page to breathe
    <div className="min-h-screen bg-[#FAF9F6] relative">
      <Suspense fallback={<SuspenseLoader />}>
        {/* 2. Changed flex-col and overflow-hidden which was trapping the scroll */}
        <div className="relative flex flex-col">
          
          {/* Fixed Header: Ensure it has a high z-index */}
          <Header />

          {/* 3. MAIN FIX: Removed h-screen and overflow-y-auto. 
              Let the body handle the scroll for the best user experience. */}
          <main className="flex-1 w-full "> 
            <div className="max-w-8xl mx-auto ">
              {children}
            </div>
          </main>

          {/* 4. Glassmorphism Background: Fixed and non-interactive */}
          <div 
            className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[32px_32px] opacity-40" 
            aria-hidden="true"
          />
          
          {/* Subtle Amber Glow (Vision Pro theme) */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-amber-500/5 blur-[120px] pointer-events-none z-[-1]" />
        </div>
      </Suspense>
    </div>
  );
}