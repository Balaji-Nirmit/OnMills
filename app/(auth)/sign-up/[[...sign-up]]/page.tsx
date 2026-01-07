"use client";

import { SignUp } from "@clerk/nextjs";
import { Factory, Boxes, Zap, Activity } from "lucide-react";
import { MotionDiv, fadeInUp } from "@/components/framer-wrappers";

const SignUpPage = () => {
  return (
    <main className="min-h-screen w-full bg-[#FFF9F6] flex items-center justify-center relative overflow-hidden p-6">
      
      {/* Background Ambience Sync */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] bg-linear-to-br from-[#FFDED2] to-transparent rounded-full blur-[140px] opacity-40" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-linear-to-tl from-[#FFEBDD] to-transparent rounded-full blur-[140px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-300 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Onboarding Context */}
        <MotionDiv 
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          className="hidden lg:flex flex-col space-y-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#1D1D1F] rounded-2xl flex items-center justify-center shadow-xl">
              <Factory className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-[#1D1D1F]">OnMills</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-[-0.05em] leading-[0.9] text-[#1D1D1F]">
              Initialize <br />
              <span className="text-[#86868B]">Operator </span>
              <span className="text-[#FF7A5C]">Profile.</span>
            </h1>
            <p className="text-xl text-[#86868B] font-medium max-w-sm">
              Join the high-velocity network for real-time factory floor material tracking.
            </p>
          </div>

          {/* Industrial Benefit Chips */}
          <div className="grid grid-cols-1 gap-4 pr-12">
            {[
              { icon: <Boxes />, label: "Batch Management", desc: "Track raw materials to finished goods." },
              { icon: <Zap />, label: "Instant Sync", desc: "Zero-latency floor data propagation." },
              { icon: <Activity />, label: "Phase Analytics", desc: "Deep-dive into production efficiency." }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] hover:bg-white/60 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-[#FF7A5C]">{feature.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#1D1D1F]">{feature.label}</p>
                  <p className="text-[11px] font-bold text-[#86868B]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>

        {/* Right Side: SignUp Form */}
        <MotionDiv 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
             {/* Subtle Industrial Grid Background Pattern for the form area */}
             <div className="absolute -inset-10 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]" />
             
             <SignUp 
              appearance={{
                elements: {
                  rootBox: "mx-auto shadow-2xl rounded-[1.5rem] overflow-hidden border border-white/50",
                  card: "bg-white/70 backdrop-blur-2xl shadow-none p-8",
                  headerTitle: "text-[#1D1D1F] font-bold tracking-tight text-2xl",
                  headerSubtitle: "text-[#86868B] font-medium mb-4",
                  socialButtonsBlockButton: "border-black/5 hover:bg-white transition-all rounded-xl py-3",
                  formButtonPrimary: "bg-[#FF7A5C] hover:bg-[#e06b50] text-sm font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-200 mt-2",
                  footerActionLink: "text-[#FF7A5C] hover:text-[#1D1D1F] font-bold",
                  formFieldInput: "bg-white/50 border-black/5 rounded-xl focus:ring-2 focus:ring-[#FF7A5C]/20 transition-all py-3",
                  dividerRow: "opacity-50",
                  dividerText: "text-[10px] font-black uppercase text-[#86868B]"
                }
              }}
            />
          </div>
        </MotionDiv>

      </div>

      {/* Security Disclaimer */}
      <div className="absolute bottom-8 right-12 opacity-30 hidden lg:flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <p className="text-[9px] font-black uppercase tracking-[0.3em]">SECURE_SERVER_ON_LOCAL_NODE_09</p>
      </div>
    </main>
  );
};

export default SignUpPage;