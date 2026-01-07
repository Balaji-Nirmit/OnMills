"use client";

import { SignIn } from "@clerk/nextjs";
import { Factory, ShieldCheck, Cpu } from "lucide-react";
import { MotionDiv, fadeInUp } from "@/components/framer-wrappers";

const SignInPage = () => {
  return (
    <main className="min-h-screen w-full bg-[#FFF9F6] flex items-center justify-center relative overflow-hidden p-6">
      
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-linear-to-bl from-[#FFDED2] to-transparent rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-linear-to-tr from-[#FFEBDD] to-transparent rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-275 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Branding & Industrial Verification */}
        <MotionDiv 
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          className="hidden lg:flex flex-col space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1D1D1F] rounded-2xl flex items-center justify-center shadow-2xl">
              <Factory className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter">OnMills</span>
          </div>

          <h1 className="text-6xl font-bold tracking-[-0.05em] leading-[0.9] text-[#1D1D1F]">
            Secure <br />
            <span className="text-[#86868B]">Access </span>
            <span className="text-[#FF7A5C]">Terminal.</span>
          </h1>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-[#FF7A5C] w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">Encrypted Protocol</p>
                <p className="text-xs font-bold text-[#86868B]">End-to-end factory floor security</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Cpu className="text-[#1D1D1F] w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F]">Node ID Verified</p>
                <p className="text-xs font-bold text-[#86868B]">Auto-sync with local relay stations</p>
              </div>
            </div>
          </div>

          <div className="pt-8 opacity-30">
            <p className="text-[9px] font-black uppercase tracking-[0.4em]">Auth_System_v4.0.2</p>
          </div>
        </MotionDiv>

        {/* Right Side: Clerk Authentication Card */}
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Glow Effect behind Clerk card */}
            <div className="absolute -inset-1 bg-linear-to-r from-[#FF7A5C] to-[#F9CB9C] rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            
            <div className="relative">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "mx-auto shadow-2xl rounded-[1.5rem] overflow-hidden border border-white/50",
                    card: "bg-white/70 backdrop-blur-2xl shadow-none",
                    headerTitle: "text-[#1D1D1F] font-bold tracking-tight",
                    headerSubtitle: "text-[#86868B] font-medium",
                    socialButtonsBlockButton: "border-black/5 hover:bg-white transition-all rounded-xl",
                    formButtonPrimary: "bg-[#1D1D1F] hover:bg-black text-sm font-bold py-3 rounded-xl transition-all shadow-xl shadow-black/10",
                    footerActionLink: "text-[#FF7A5C] hover:text-[#e06b50] font-bold",
                    formFieldInput: "bg-white/50 border-black/5 rounded-xl focus:ring-2 focus:ring-[#FF7A5C]/20 transition-all"
                  }
                }}
              />
            </div>
          </div>
        </MotionDiv>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 hidden lg:block">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">Standard Industrial Protocol — 2026</p>
      </div>
    </main>
  );
};

export default SignInPage;