"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import IssueDetailsDialog from "./issue-details-dialog";
import UserAvatar from "./user-avatar";
import { useRouter } from "next/navigation";

const priorityConfig = {
  LOW: { color: "bg-[#28CD41]", label: "Low", text: "text-[#1D8B2E]", glow: "shadow-[0_0_12px_rgba(40,205,65,0.3)]" },
  MEDIUM: { color: "bg-[#FFCC00]", label: "Medium", text: "text-[#A38200]", glow: "shadow-[0_0_12px_rgba(255,204,0,0.3)]" },
  HIGH: { color: "bg-[#FF9500]", label: "High", text: "text-[#B26900]", glow: "shadow-[0_0_12px_rgba(255,149,0,0.3)]" },
  URGENT: { color: "bg-[#FF3B30]", label: "Urgent", text: "text-[#CC2E26]", glow: "shadow-[0_0_12px_rgba(255,59,48,0.3)]" },
};

export default function IssueCard({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const config = priorityConfig[issue.priority];

  const created = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
  });

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="group relative flex flex-col p-5 bg-white/40 backdrop-blur-[30px] border border-[#1D1D1F]/10 rounded-[28px] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-white/60 hover:border-[#1D1D1F]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 active:scale-[0.97] cursor-pointer overflow-hidden"
      >
        {/* 1. DYNAMIC AMBER CAUSTIC: Glows only on hover */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A5C]/10 blur-[50px] rounded-full translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full space-y-5">
          {/* HEADER: PRIORITY & STATUS */}
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/60 border border-white/80 ${config.glow}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${config.text}`}>
                {config.label}
              </span>
            </div>
            {showStatus && (
              <span className="text-[9px] font-bold text-[#1D1D1F]/40 uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded-md">
                {issue.status}
              </span>
            )}
          </div>

          {/* BODY: THE DIRECTIVE */}
          <h3 className="text-[16px] font-semibold text-[#1D1D1F] tracking-tight leading-snug">
            {issue.title}
          </h3>

          {/* FOOTER: THE RESOURCE METADATA */}
          <div className="flex items-center justify-between pt-3 border-t border-black/4">
            <div className="scale-90 origin-left hover:scale-100 transition-transform duration-300">
              <UserAvatar user={issue.assignee} />
            </div>
            <time className="text-[10px] font-medium text-[#86868B]/70 tabular-nums">
              {created}
            </time>
          </div>
        </div>

        {/* 2. THE LENS SHIMMER: A persistent light edge */}
        <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/50 pointer-events-none" />
      </div>

      {isDialogOpen && (
        <IssueDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          issue={issue}
          onDelete={(...p) => { router.refresh(); onDelete(...p); }}
          onUpdate={(...p) => { router.refresh(); onUpdate(...p); }}
        />
      )}
    </>
  );
}