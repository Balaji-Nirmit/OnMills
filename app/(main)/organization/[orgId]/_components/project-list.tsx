// components/ProjectList.jsx
import Link from "next/link";
import { getProjects } from "@/actions/organization";
import DeleteProject from "./delete-project";
import { ChevronRight, Plus, Box, LayoutGrid } from "lucide-react";

type Props={
  orgId:string
}

export default async function ProjectList({ orgId }:Props) {
  const projects = await getProjects(orgId);

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-[#FAF9F6] border border-[#F2F0EB] rounded-[48px]">
        <div className="w-24 h-24 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center mb-8">
          <Box className="w-10 h-10 text-[#FF7A5C]" strokeWidth={1.5} />
        </div>
        <h3 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">Empty Floor</h3>
        <p className="text-[16px] text-[#86868B] mt-3 mb-10 text-center max-w-sm font-medium">
          Initialize your first operational project node to begin.
        </p>
        <Link
          className="px-10 py-4 bg-[#1D1D1F] text-white text-[14px] font-bold rounded-full hover:bg-black transition-all shadow-2xl active:scale-[0.98]"
          href="/project/create"
        >
          Create Project
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="group relative bg-[#FAF9F6] border border-[#F2F0EB] rounded-[40px] p-9 transition-all duration-700 hover:bg-white hover:border-[#FFD8C7] hover:shadow-[0_40px_100px_-20px_rgba(255,122,92,0.18)]"
        >
          {/* Functional Header */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#F2F0EB] group-hover:border-[#FF7A5C]/20 transition-all">
                <LayoutGrid size={18} className="text-[#FF7A5C]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#FF7A5C] uppercase tracking-[0.2em] leading-none">Node</span>
                <span className="text-[12px] font-bold text-[#1D1D1F] uppercase mt-1">{project.key}</span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
               <DeleteProject projectId={project.id} />
            </div>
          </div>

          {/* Typography Section */}
          <div className="mb-16">
            <h3 className="text-[28px] font-bold text-[#1D1D1F] tracking-tighter leading-[1.1] mb-4 group-hover:translate-x-1 transition-transform duration-500">
              {project.name}
            </h3>
            <p className="text-[16px] text-[#86868B] leading-relaxed font-medium line-clamp-2 max-w-[90%]">
              {project.description || "System_log: Operational metadata not yet defined."}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest">Registered</span>
              <span className="text-[15px] font-bold text-[#1D1D1F]">
                {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(project.createdAt))}
              </span>
            </div>

            <Link
              href={`/project/${project.id}`}
              className="flex items-center justify-center h-16 w-16 bg-[#1D1D1F] text-white rounded-[24px] transition-all duration-500 hover:bg-[#FF7A5C] hover:scale-110 shadow-xl shadow-black/10 active:scale-95 group-hover:shadow-[#FF7A5C]/30"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-black/1 pointer-events-none group-hover:ring-[#FF7A5C]/10" />
        </div>
      ))}
    </div>
  );
}