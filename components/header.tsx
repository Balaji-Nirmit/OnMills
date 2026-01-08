import { SignedIn } from "@clerk/nextjs";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/checkUser";
import OrgSwitcher from "./org-switcher";
import Image from "next/image";

const Header = async () => {
    await checkUser();

    return (
        <header className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-2xl border-b border-[#F2F0EB]">
            <div className="max-w-400 mx-auto px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <Image src={'/logo.png'} width={144} alt="OnMills"
                            height={20}
                            style={{ height: 'auto' }} />
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