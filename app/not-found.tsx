"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      {/* 1. ATMOSPHERIC DISTORTION */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#FF7A5C]/20 blur-[60px] rounded-full animate-pulse" />
        <div className="relative h-20 w-20 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[24px] flex items-center justify-center shadow-2xl">
          <AlertCircle size={40} className="text-[#FF7A5C]" strokeWidth={1.5} />
        </div>
      </div>

      {/* 2. TYPOGRAPHIC CLARITY */}
      <div className="space-y-3 mb-10 max-w-sm">
        <h2 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">
          Page not found
        </h2>
        <p className="text-[14px] font-medium text-[#86868B] leading-relaxed">
          Page not exist or is of different organization. 
        </p>
      </div>

      {/* 4. SUBTLE AMBER GROUND GLOW */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-100 h-px bg-linear-to-r from-transparent via-[#FF7A5C]/40 to-transparent" />
    </div>
  );
}