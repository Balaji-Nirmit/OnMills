"use client";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import IssueDetailsDialog from "./issue-details-dialog";
import UserAvatar from "./user-avatar";
import { useRouter } from "next/navigation";
import { DetailedIssue, IssueType } from "@/lib/types";

const priorityConfig = {
  LOW: { color: "bg-[#28CD41]", label: "Low", text: "text-[#1D8B2E]", glow: "shadow-[0_0_12px_rgba(40,205,65,0.3)]" },
  MEDIUM: { color: "bg-[#FFCC00]", label: "Medium", text: "text-[#A38200]", glow: "shadow-[0_0_12px_rgba(255,204,0,0.3)]" },
  HIGH: { color: "bg-[#FF9500]", label: "High", text: "text-[#B26900]", glow: "shadow-[0_0_12px_rgba(255,149,0,0.3)]" },
  URGENT: { color: "bg-[#FF3B30]", label: "Urgent", text: "text-[#CC2E26]", glow: "shadow-[0_0_12px_rgba(255,59,48,0.3)]" },
};

interface IssueCardProps {
  issue: DetailedIssue;
  showStatus?: boolean;
  onDelete?: () => void;
  onUpdate?: (updated: DetailedIssue) => void;
}

export default function IssueCard({ issue, showStatus = false, onDelete = () => { }, onUpdate = () => { } }: IssueCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const config = priorityConfig[issue.priority];

  return (
    <>
      <div onClick={() => setIsDialogOpen(true)} className="group relative flex flex-col p-5 bg-white/40 backdrop-blur-[30px] border border-[#1D1D1F]/10 rounded-[28px] transition-all hover:bg-white/60 hover:-translate-y-1 active:scale-[0.97] cursor-pointer overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A5C]/10 blur-[50px] rounded-full translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full space-y-5">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/60 border border-white/80 ${config.glow}`}><div className={`w-1.5 h-1.5 rounded-full ${config.color}`} /><span className={`text-[9px] font-black uppercase tracking-[0.15em] ${config.text}`}>{config.label}</span></div>
            {showStatus && <span className="text-[9px] font-bold text-[#1D1D1F]/40 uppercase tracking-widest bg-black/5 px-2 py-0.5 rounded-md">{issue.status}</span>}
          </div>
          <div className="flex justify-between">
          <h3 className="text-[16px] font-semibold text-[#1D1D1F] tracking-tight">{issue.item.name}</h3>
          <span>{issue.quantity} {issue.unit}</span>
          </div>
          {/* <div className="flex items-center justify-between pt-3 border-t border-black/4">
            <UserAvatar user={issue.assignee} />
            <time className="text-[10px] font-medium text-[#86868B]/70 tabular-nums">{formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}</time>
          </div> */}
        </div>
        <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/50 pointer-events-none" />
      </div>
      {isDialogOpen && (
        <IssueDetailsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} issue={issue} onDelete={() => { router.refresh(); onDelete(); }} onUpdate={(updated) => { router.refresh(); onUpdate(updated); }} />
      )}
    </>
  );
}