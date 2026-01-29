// app/(main)/organization/[orgId]/page.jsx
import { getOrganization } from '@/actions/organization';
import ProjectList from "./_components/project-list";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { 
    Plus, 
    LayoutGrid, 
    ShieldCheck, 
    Zap, 
    Globe, 
    Terminal, 
    CheckCircle2, 
    Warehouse
} from "lucide-react";
import { redirect } from 'next/navigation';

const Organization = async ({ params }:{params:{orgId:string}}) => {
    const { orgId } = await params;
    const { userId } = await auth();
    
    if (!userId) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FAF9F6] p-8">
                <div className="w-full max-w-md bg-white border border-[#F2F0EB] p-12 rounded-[48px] shadow-2xl shadow-black/2 text-center">
                    <div className="w-20 h-20 bg-[#FFF0EA] rounded-[28px] flex items-center justify-center mx-auto mb-8 border border-[#FFD8C7]">
                        <ShieldCheck className="text-[#FF7A5C]" size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-[28px] font-bold text-[#1D1D1F] tracking-tighter mb-3">Unauthorized Access</h1>
                    <p className="text-[#86868B] text-[15px] font-medium leading-relaxed">
                        This organization node is either inactive or your security clearance does not permit entry.
                    </p>
                </div>
            </div>
        );
    }

    const organization = await getOrganization(orgId);

    if (!organization) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#FAF9F6] p-8">
                <div className="w-full max-w-md bg-white border border-[#F2F0EB] p-12 rounded-[48px] shadow-2xl shadow-black/2 text-center">
                    <div className="w-20 h-20 bg-[#FFF0EA] rounded-[28px] flex items-center justify-center mx-auto mb-8 border border-[#FFD8C7]">
                        <ShieldCheck className="text-[#FF7A5C]" size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-[28px] font-bold text-[#1D1D1F] tracking-tighter mb-3">Unauthorized Access</h1>
                    <p className="text-[#86868B] text-[15px] font-medium leading-relaxed">
                        This organization node is either inactive or your security clearance does not permit entry.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] selection:bg-[#FF7A5C]/20 selection:text-[#FF7A5C]">
            <main className="max-w-350 mx-auto px-8 py-16">
                
                {/* 1. ARCHITECTURAL HEADER */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-[#1D1D1F] text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
                            Inventory_Hub
                            </div>
                            <div className="h-4 w-px bg-[#E5E3DD]" />
                            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest flex items-center gap-2">
                            <Warehouse size={12} className="text-[#34C759]" />
                            Warehouse_Status_Online
                            </span>
                        </div>
                        <h2 className="text-[56px] md:text-[72px] font-bold tracking-tighter leading-[0.9] text-[#1D1D1F]">
                            Strategic <br /> 
                            <span className="text-[#FF7A5C]">Infrastructure.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/project/create"
                            className="group flex items-center gap-5 px-8 py-5 bg-[#1D1D1F] text-white rounded-[24px] transition-all hover:bg-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-[0.97]"
                        >
                            <div className="w-8 h-8 bg-[#FF7A5C] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-90 duration-500">
                                <Plus size={20} strokeWidth={3} className="text-[#1D1D1F]" />
                            </div>
                            <span className="text-[16px] font-bold tracking-tight">Add New Stock Category</span>
                        </Link>
                    </div>
                </header>

                {/* 2. PROJECT REGISTRY SECTION */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white rounded-2xl border border-[#F2F0EB] shadow-sm">
                                <LayoutGrid size={20} className="text-[#FF7A5C]" strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="text-[20px] font-bold tracking-tight text-[#1D1D1F]">Master Catalog</h3>
                                <p className="text-[12px] font-bold text-[#86868B] uppercase tracking-widest opacity-60">Active_Operations</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] border border-[#F2F0EB] rounded-full text-[11px] font-bold text-[#86868B]">
                            <Terminal size={14} />
                            <span>Catalog_Sync: {new Date().toLocaleTimeString()}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-[#F2F0EB] rounded-[48px] p-2 shadow-2xl shadow-black/1">
                        <div className="bg-[#FAF9F6]/30 rounded-[44px] p-6 lg:p-10">
                            <ProjectList orgId={organization.id} />
                        </div>
                    </div>
                </section>

                {/* 3. ASSIGNED TASKS (USER ISSUES) */}
                {/* <section className="relative">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-white rounded-2xl border border-[#F2F0EB] shadow-sm">
                            <Zap size={20} className="text-[#FF7A5C]" strokeWidth={2} />
                        </div>
                        <div>
                            <h3 className="text-[20px] font-bold tracking-tight text-[#1D1D1F]">Assigned Directives</h3>
                            <p className="text-[12px] font-bold text-[#86868B] uppercase tracking-widest opacity-60">Personal_Queue</p>
                        </div>
                        <div className="flex-1 h-px bg-[#F2F0EB] ml-4" />
                    </div>

                    <div className="bg-white border border-[#F2F0EB] rounded-[48px] p-8 lg:p-12 shadow-sm">
                        <UserIssues userId={userId} />
                    </div>
                </section> */}
            </main>
        </div>
    );
};

export default Organization;