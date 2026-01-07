"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Search, Sliders, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueType, UserType } from "@/lib/types";

type IssuesWithUsers=IssueType & {
  assignee:UserType | null,
  reporter:UserType,
}
const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export default function BoardFilters({ issues, onFilterChange }:{issues:IssuesWithUsers[]}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  const assignees = issues
    .map((issue) => issue.assignee)
    .filter(
      (item, index, self) => item && index === self.findIndex((t) => t.id === item.id)
    );

  useEffect(() => {
    const filteredIssues = issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedAssignees.length === 0 ||
          selectedAssignees.includes(issue.assignee?.id)) &&
        (selectedPriority === "" || issue.priority === selectedPriority)
    );
    onFilterChange(filteredIssues);
  }, [searchTerm, selectedAssignees, selectedPriority, issues]);

  const toggleAssignee = (assigneeId) => {
    setSelectedAssignees((prev) =>
      prev.includes(assigneeId)
        ? prev.filter((id) => id !== assigneeId)
        : [...prev, assigneeId]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAssignees([]);
    setSelectedPriority("");
  };

  const isFiltersApplied =
    searchTerm !== "" ||
    selectedAssignees.length > 0 ||
    selectedPriority !== "";

  return (
    <div className="relative w-full py-6">
      {/* 1. AMBER GEOMETRIC GLOW */}
      <div className="absolute -top-6 left-1/4 w-1/2 h-24 bg-[#FF7A5C]/10 blur-[80px] rounded-full pointer-events-none" />

      {/* 2. THE LENS CONTAINER */}
      <div className="relative flex flex-col lg:flex-row items-center gap-6 p-2 bg-white/20 backdrop-blur-3xl border border-white/30 rounded-[30px] shadow-[0_15px_35px_rgba(0,0,0,0.03)]">
        
        {/* 3. SEARCH (Frosted) */}
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#86868B]" />
          <Input
            className="w-full h-12 pl-12 bg-white/40 border-none rounded-2xl text-[14px] font-bold tracking-tight shadow-inner focus-visible:ring-2 focus-visible:ring-[#FF7A5C]/10 transition-all placeholder:text-[#86868B]/40"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 4. TEAM NODES */}
        <div className="flex items-center gap-4 px-3 h-12 bg-white/10 rounded-2xl border border-white/10">
          <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-500">
            {assignees.map((assignee, i) => {
              const isSelected = selectedAssignees.includes(assignee.id);
              return (
                <button
                  key={assignee?.id}
                  onClick={() => toggleAssignee(assignee?.id)}
                  className={`relative transition-all duration-300 ${isSelected ? "z-20 scale-110" : ""}`}
                >
                  <div className={`p-[1.5px] rounded-full ${isSelected ? "bg-[#FF7A5C] shadow-[0_0_10px_#FF7A5C]" : "bg-white/40"}`}>
                    <Avatar className="h-8 w-8 border border-white/10 rounded-full shadow-md">
                      <AvatarImage src={assignee?.profileImageUrl} />
                      <AvatarFallback className="bg-white text-[9px] font-black">{assignee?.name? assignee.name[0] : <></>}</AvatarFallback>
                    </Avatar>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. PRIORITY & RESET */}
        <div className="flex items-center gap-3 ml-auto w-full lg:w-auto">
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="h-12 w-full lg:w-48 bg-white/40 border-none rounded-2xl px-5 font-black text-[12px] tracking-tight hover:bg-white/60 transition-all">
              <div className="flex items-center gap-2">
                <Sliders size={14} className="text-[#FF7A5C]" />
                <SelectValue placeholder="Priority" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl">
              {priorities.map((p) => (
                <SelectItem key={p} value={p} className="rounded-xl font-bold text-[12px]">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isFiltersApplied && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="h-12 px-5 rounded-2xl bg-[#1D1D1F] text-white hover:bg-black transition-all flex items-center gap-2"
            >
              <X size={14} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-widest">Clear</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}