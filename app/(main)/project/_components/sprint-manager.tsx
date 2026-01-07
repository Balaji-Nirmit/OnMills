"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarLoader } from "react-spinners";
import { formatDistanceToNow, isAfter, isBefore, format } from "date-fns";
import useFetch from "@/hooks/use-fetch";
import { useRouter, useSearchParams } from "next/navigation";
import { updateSprintStatus } from "@/actions/sprints";
import { Calendar, ChevronRight, Play, Square, Timer, AlertCircle } from "lucide-react";

export default function SprintManager({
  sprint,
  setSprint,
  sprints,
  projectId,
}) {
  const [status, setStatus] = useState(sprint.status);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    fn: updateStatus,
    loading,
    error,
    data: updatedStatus,
  } = useFetch(updateSprintStatus);

  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();

  const canStart = isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";
  const canEnd = status === "ACTIVE";

  const handleStatusChange = async (newStatus) => {
    updateStatus(sprint.id, newStatus);
  };

  useEffect(() => {
    if (updatedStatus && updatedStatus.success) {
      setStatus(updatedStatus.sprint.status);
      setSprint({ ...sprint, status: updatedStatus.sprint.status });
    }
  }, [updatedStatus, loading]);

  const getStatusDisplay = () => {
    if (status === "COMPLETED") return { text: "Cycle Concluded", icon: <Square size={12}/>, class: "bg-gray-100 text-gray-500" };
    if (status === "ACTIVE" && isAfter(now, endDate)) return { text: `Overdue: ${formatDistanceToNow(endDate)}`, icon: <AlertCircle size={12}/>, class: "bg-red-50 text-red-600 border border-red-100" };
    if (status === "PLANNED" && isBefore(now, startDate)) return { text: `T-Minus ${formatDistanceToNow(startDate)}`, icon: <Timer size={12}/>, class: "bg-[#FFF0EA] text-[#FF7A5C] border border-[#FFD8C7]" };
    if (status === "ACTIVE") return { text: "Node Live", icon: <Play size={12}/>, class: "bg-green-50 text-green-600 border border-green-100" };
    return null;
  };

  const statusInfo = getStatusDisplay();

  const handleSprintChange = (value) => {
    const selectedSprint = sprints.find((s) => s.id === value);
    setSprint(selectedSprint);
    setStatus(selectedSprint.status);
    router.replace(`/project/${projectId}`, undefined, { shallow: true });
  };

  return (
    <div className="bg-white border border-[#F2F0EB] rounded-[32px] p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* 1. SPRINT SELECTOR */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">Select Active Batch</label>
          <Select value={sprint.id} onValueChange={handleSprintChange}>
            <SelectTrigger className="h-14 bg-[#FAF9F6] border-none rounded-2xl w-full md:w-[320px] px-5 font-bold text-[15px] focus:ring-2 focus:ring-[#FF7A5C]/20 transition-all">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-[#FF7A5C]" />
                <SelectValue placeholder="Select Sprint" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-[#F2F0EB] shadow-2xl p-2">
              {sprints.map((s) => (
                <SelectItem key={s.id} value={s.id} className="rounded-xl py-3 font-medium">
                  <div className="flex flex-col">
                    <span className="font-bold">{s.name}</span>
                    <span className="text-[11px] text-[#86868B]">{format(new Date(s.startDate), "MMM d")} - {format(new Date(s.endDate), "MMM d, yyyy")}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 2. DYNAMIC STATUS & ACTIONS */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {statusInfo && (
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-tight ${statusInfo.class}`}>
              {statusInfo.icon}
              {statusInfo.text}
            </div>
          )}

          <div className="h-8 w-px bg-[#F2F0EB] hidden md:block" />

          {canStart && (
            <Button
              onClick={() => handleStatusChange("ACTIVE")}
              disabled={loading}
              className="h-12 px-8 bg-[#34C759] hover:bg-[#2ead4d] text-white rounded-xl font-bold text-[13px] shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center gap-2"
            >
              <Play size={16} fill="currentColor" />
              Start Deployment
            </Button>
          )}

          {canEnd && (
            <Button
              onClick={() => handleStatusChange("COMPLETED")}
              disabled={loading}
              className="h-12 px-8 bg-[#1D1D1F] hover:bg-black text-white rounded-xl font-bold text-[13px] shadow-lg shadow-black/5 transition-all active:scale-95 flex items-center gap-2"
            >
              <Square size={14} fill="currentColor" />
              End Operation
            </Button>
          )}
        </div>
      </div>

      {/* 3. SYSTEM FEEDBACK LAYER */}
      {loading && (
        <div className="mt-6 rounded-full overflow-hidden border border-[#F2F0EB]">
          <BarLoader width={"100%"} color="#FF7A5C" height={4} />
        </div>
      )}

      {error && (
        <p className="mt-4 text-center text-red-500 text-[11px] font-bold uppercase tracking-widest bg-red-50 py-2 rounded-lg">
          System Error: {error.message}
        </p>
      )}
    </div>
  );
}