// shared tracking component of life cycle

import { DetailedIssue } from "@/lib/types";
import { Activity, ArrowRight, RotateCcw } from "lucide-react";
type Prop = {
    filteredIssues: DetailedIssue[] | null
}
const IssueLifecycleDisplay = ({ filteredIssues }: Prop) => {
    const MASTER_SEQUENCE = [
        "TODO", "PURCHASE", "STORE", "BUFFING",
        "PAINTING", "WINDING", "ASSEMBLY", "PACKING", "SALES"
    ];

    return (
        <div className="p-2 font-sans text-[#3D3D3D]">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-[#FCEEE9] rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="relative z-10 max-w-full mx-auto space-y-11">
                {filteredIssues && filteredIssues.length === 0 ? (
                    <div className="p-20 text-center bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-black/3 shadow-sm">
                        <p className="text-black/30 font-medium tracking-tight italic">Inventory track is empty.</p>
                    </div>
                ) : (
                    filteredIssues?.map((issue) => {
                        const trackHistory = issue.track ?? [];

                        return (
                            <div key={issue.id} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                                <div className="flex items-end justify-between px-4 mb-2">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-semibold tracking-tight text-[#1D1D1F]">
                                            {issue.item.name}
                                        </h2>
                                    </div>
                                </div>
                                <div className="relative p-2 rounded-[2.5rem] bg-white/40 backdrop-blur-2xl border border-white shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-x-auto no-scrollbar">
                                    <div className="flex items-center p-2 gap-2 min-w-max">
                                        {trackHistory.map((status, idx) => {
                                            const isLast = idx === trackHistory.length - 1;
                                            const isRepeat = trackHistory.slice(0, idx).includes(status);
                                            const seqOrder = MASTER_SEQUENCE.indexOf(status) + 1;

                                            return (
                                                <div key={`${status}-${idx}`} className="flex items-center gap-3">
                                                    <div className={`
                              relative min-w-47.5 p-2 rounded-[1.8rem] transition-all duration-500
                              border shadow-sm
                              ${isLast
                                                            ? 'bg-white border-[#F2E8E4] scale-105 z-20 shadow-[0_12px_24px_rgba(0,0,0,0.05)]'
                                                            : isRepeat
                                                                ? 'bg-[#FDFBF9] border-[#EAE2DF]'
                                                                : 'bg-white/40 border-transparent hover:border-black/5'}
                            `}>

                                                        {/* Entry Indicator */}
                                                        <div className="flex justify-between items-center mb-4">
                                                            <span className={`text-[9px] font-black tracking-widest ${isLast ? 'text-[#FF7A51]' : 'text-black/20'}`}>
                                                                STEP {idx + 1}
                                                            </span>
                                                            {isRepeat && (
                                                                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#FFF4F0] rounded-md border border-[#FCEEE9]">
                                                                    <RotateCcw size={10} className="text-[#FF7A51]" />
                                                                    <span className="text-[8px] font-bold text-[#FF7A51]">REVISIT</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h3 className={`text-[13px] font-bold tracking-tight uppercase mb-1 ${isLast ? 'text-black' : 'text-black/60'}`}>
                                                            {status}
                                                        </h3>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-1 h-1 rounded-full ${isLast ? 'bg-[#FF7A51]' : 'bg-black/10'}`} />
                                                            <span className="text-[10px] font-medium text-black/30">
                                                                Phase {seqOrder}
                                                            </span>
                                                        </div>
                                                        {isLast && (
                                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#FF7A51] rounded-full blur-[2px]" />
                                                        )}
                                                    </div>
                                                    {!isLast && (
                                                        <ArrowRight className="text-black shrink-0" size={16} strokeWidth={1.5} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* UX Summary Bar */}
                                <div className="mt-5 px-6 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 group">
                                            <div className="w-2 h-2 rounded-full bg-[#FF7A51] group-hover:animate-ping" />
                                            <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Active Processing</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Activity size={12} className="text-black/20" />
                                            <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{trackHistory.length} Movement Logs</span>
                                        </div>
                                    </div>

                                    <div className="text-[10px] font-medium text-black/30 italic">
                                        Sequential tracking enabled
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
export default IssueLifecycleDisplay;