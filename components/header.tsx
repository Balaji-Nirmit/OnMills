import { SignedIn } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import { Search, Bell, Menu, LayoutGrid, Settings2, Zap } from "lucide-react";
import OrgSwitcher from "./org-switcher";

const Header = async () => {
    await checkUser();

    return (
        <header className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-2xl border-b border-[#F2F0EB]">
            <div className="max-w-400 mx-auto px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1D1D1F] rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                            <Zap size={20} className="text-[#FF7A5C]" fill="currentColor" />
                        </div>
                        <div className="h-6 w-px bg-[#E5E3DD]" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-[#FF7A5C] uppercase tracking-[0.25em] leading-none mb-1">OnMills OS</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">

                    <OrgSwitcher />
                    <SignedIn>
                        <div className="h-11 w-11 bg-white border border-[#F2F0EB] rounded-2xl flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:shadow-md transition-all">
                            <UserMenu />
                        </div>
                    </SignedIn>

                </div>
            </div>
        </header>
    );
};

export default Header;