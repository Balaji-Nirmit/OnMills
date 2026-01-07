"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Search, Sliders } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DetailedIssue } from "./sprint-board";
import { UserType } from "@/lib/types";

interface BoardFiltersProps {
  issues: DetailedIssue[];
  onFilterChange: (filteredIssues: DetailedIssue[]) => void;
}

const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export default function BoardFilters({ issues, onFilterChange }: BoardFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const assignees = issues
    .map((issue) => issue.assignee)
    .filter((item, index, self): item is UserType => 
      item !== null && index === self.findIndex((t) => t?.id === item.id)
    );

  useEffect(() => {
    const filteredIssues = issues.filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAssignee = selectedAssignees.length === 0 || (issue.assignee && selectedAssignees.includes(issue.assignee.id));
      const matchesPriority = selectedPriority === "all" || issue.priority === selectedPriority;
      return matchesSearch && matchesAssignee && matchesPriority;
    });
    onFilterChange(filteredIssues);
  }, [searchTerm, selectedAssignees, selectedPriority, issues]);

  const toggleAssignee = (id: string) => setSelectedAssignees(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  const clearFilters = () => { setSearchTerm(""); setSelectedAssignees([]); setSelectedPriority("all"); };

  return (
    <div className="relative w-full py-6">
      <div className="absolute -top-6 left-1/4 w-1/2 h-24 bg-[#FF7A5C]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row items-center gap-6 p-2 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[30px] shadow-sm">
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <Input className="w-full h-12 pl-12 bg-white/40 border-none rounded-2xl font-bold shadow-inner" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="flex items-center gap-4 px-3 h-12 bg-white/10 rounded-2xl border border-white/10">
          <div className="flex -space-x-3 hover:-space-x-1 transition-all">
            {assignees.map((assignee) => (
              <button key={assignee.id} onClick={() => toggleAssignee(assignee.id)} className={`relative ${selectedAssignees.includes(assignee.id) ? "z-20 scale-110" : ""}`}>
                <div className={`p-[1.5px] rounded-full ${selectedAssignees.includes(assignee.id) ? "bg-[#FF7A5C]" : "bg-white/40"}`}>
                  <Avatar className="h-8 w-8 border border-white/10 rounded-full"><AvatarImage src={assignee.profileImageUrl || ""} /><AvatarFallback className="bg-white font-black">{assignee.name?.[0]}</AvatarFallback></Avatar>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="h-12 w-48 bg-white/40 border-none rounded-2xl px-5 font-black text-[12px]"><Sliders size={14} className="text-[#FF7A5C]" /><SelectValue placeholder="Priority" /></SelectTrigger>
            <SelectContent className="rounded-2xl bg-white/90 backdrop-blur-xl">
              <SelectItem value="all" className="rounded-xl font-bold">All Priorities</SelectItem>
              {priorities.map((p) => <SelectItem key={p} value={p} className="rounded-xl font-bold">{p}</SelectItem>)}
            </SelectContent>
          </Select>
          {(searchTerm || selectedAssignees.length > 0 || selectedPriority !== "all") && (
            <Button variant="ghost" onClick={clearFilters} className="h-12 px-5 rounded-2xl bg-[#1D1D1F] text-white flex items-center gap-2"><X size={14} strokeWidth={3} /><span className="text-[10px] font-black uppercase tracking-widest">Clear</span></Button>
          )}
        </div>
      </div>
    </div>
  );
}