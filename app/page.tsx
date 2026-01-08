import {
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Factory,
  Boxes,
  Workflow
} from 'lucide-react';
import { MotionDiv, MotionH1, fadeInUp, scaleIn } from '@/components/framer-wrappers';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-[#FFF9F6] text-[#1D1D1F] font-sans antialiased overflow-hidden relative selection:bg-orange-100">

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-linear-to-br from-[#FFDED2] to-transparent rounded-full blur-[160px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-linear-to-tr from-[#FFEBDD] to-transparent rounded-full blur-[140px] opacity-50" />
      </div>

      <div className="relative z-10 min-h-screen w-full max-w-350 mx-auto flex flex-col px-4 sm:px-8 py-8">

        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-2">
            <Image src={'/logo.png'} width={144} alt="OnMills"
              height={20}
              style={{ height: 'auto' }} />
          </div>

          <div className="flex items-center gap-1 bg-white/40 backdrop-blur-2xl border border-white/50 px-2 py-1.5 rounded-full shadow-sm">
            {['Tracking', 'Phases', 'Analytics'].map((item) => (
              <a key={item} href="#" className="px-5 py-2 text-[11px] font-bold text-[#86868B] hover:text-black transition-all rounded-full hover:bg-white/50 lowercase tracking-wider">
                {item}
              </a>
            ))}
          </div>

          <span className="bg-white text-black border border-black/5 px-6 py-3 rounded-full text-xs font-bold hover:shadow-xl transition-all">
            CursorBits
          </span>
        </nav>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <div className="col-span-1 lg:col-span-6 space-y-10">
            <MotionDiv {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF7A5C]/5 border border-[#FF7A5C]/10 rounded-full w-fit">
                <CircleDot className="w-3 h-3 text-[#FF7A5C] animate-pulse" />
                <span className="text-[10px] font-black text-[#FF7A5C] uppercase tracking-[0.25em]">Live Floor Sync Active</span>
              </div>
            </MotionDiv>

            <MotionH1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-[100px] font-bold tracking-[-0.07em] leading-[0.85]"
            >
              Track every <br />
              <span className="text-[#86868B]">phase </span>
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#FF7A5C] to-[#F9CB9C]">instantly.</span>
            </MotionH1>

            <MotionDiv {...fadeInUp} transition={{ delay: 0.2 }}>
              <p className="text-xl lg:text-2xl text-[#86868B] max-w-md font-medium leading-tight">
                The premium SaaS for modern factories to monitor material processing in real-time.
              </p>
            </MotionDiv>

            <MotionDiv {...fadeInUp} transition={{ delay: 0.3 }}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* clerk */}
                <SignedOut>
                  <SignInButton forceRedirectUrl="/onboarding">
                    <button className="group bg-[#1D1D1F] text-white px-10 py-5 rounded-3xl font-bold text-lg hover:bg-black transition-all flex items-center gap-3 shadow-2xl shadow-black/20 w-full sm:w-auto cursor-pointer">
                      Get Started Here <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/onboarding" className="group bg-[#1D1D1F] text-white px-10 py-5 rounded-3xl font-bold text-lg hover:bg-black transition-all flex items-center gap-3 shadow-2xl shadow-black/20 w-full sm:w-auto cursor-pointer">
                    Access Board <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </SignedIn>
                <div className="flex items-center gap-3 bg-white/40 p-2 pr-6 rounded-2xl border border-white/60">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Boxes className="w-5 h-5 text-[#FF7A5C]" />
                  </div>
                  <span className="text-xs font-bold text-[#86868B]">1.2k Materials Logged</span>
                </div>
              </div>
            </MotionDiv>
          </div>

          <MotionDiv
            {...scaleIn}
            className="col-span-1 lg:col-span-6 w-full h-full min-h-125 bg-white/20 backdrop-blur-3xl border border-white/60 rounded-[4rem] p-1 shadow-2xl overflow-hidden"
          >
            <div className="h-full w-full bg-linear-to-br from-white/80 to-white/40 rounded-[3.8rem] p-12 flex flex-col justify-between relative">

              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-[#FF7A5C] uppercase tracking-widest">Active Workflow</div>
                  <div className="text-3xl font-bold">Processing Floor</div>
                </div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Workflow className="w-6 h-6 text-[#FF7A5C]" />
                </div>
              </div>

              {/* Kanban Mock */}
              <div className="relative h-56 w-full bg-[#FFF9F6]/50 border border-orange-100/30 rounded-3xl p-6">
                <div className="flex gap-3 mb-6">
                  <div className="px-3 py-1 bg-[#FF7A5C] rounded-full text-[9px] font-bold text-white uppercase tracking-tighter">In Review</div>
                  <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Assembly</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <MotionDiv
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-orange-50 cursor-pointer"
                  >
                    <div className="w-full h-1 bg-orange-100 rounded-full mb-3" />
                    <div className="text-[10px] font-bold">Steel Grade A-12</div>
                  </MotionDiv>
                  <div className="bg-white/40 p-4 rounded-2xl border border-dashed border-gray-200" />
                </div>

                {/* Floating Detail Card */}
                <MotionDiv
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2.5 right-10 w-40 bg-white rounded-2xl shadow-2xl border border-orange-50 p-5 z-20"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[9px] font-black uppercase text-gray-400">Phase 3</span>
                  </div>
                  <div className="text-xs font-bold mb-1">Polishing Dept.</div>
                  <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-[#FF7A5C]" />
                  </div>
                </MotionDiv>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-[#1D1D1F] rounded-3xl p-6 flex items-center justify-between">
                  <span className="text-white text-xs font-bold tracking-widest uppercase opacity-40">Factory Velocity</span>
                  <span className="text-[#FF7A5C] text-xs font-black">+24%</span>
                </div>
                <div className="w-16 h-16 bg-white border border-black/5 rounded-3xl flex items-center justify-center shadow-lg hover:bg-[#FF7A5C] hover:text-white transition-all cursor-pointer">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>

            </div>
          </MotionDiv>
        </div>

        <footer className="h-12 flex items-center justify-between opacity-30 mt-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">By CursorBits</p>
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">© 2026</p>
        </footer>
      </div>
    </div>
  );
}