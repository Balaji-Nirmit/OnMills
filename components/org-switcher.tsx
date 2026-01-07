"use client";

import { usePathname } from "next/navigation";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();

  if (pathname === "/" || !isLoaded || !isUserLoaded) return null;

  return (
    <div className="flex items-center">
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          createOrganizationMode={pathname === "/onboarding" ? "navigation" : "modal"}
          afterCreateOrganizationUrl="/organization/:slug"
          afterSelectOrganizationUrl="/organization/:slug"
          createOrganizationUrl="/onboarding"
          appearance={{
            elements: {
              rootBox: "flex items-center",
              organizationSwitcherTrigger: 
                "h-11 min-w-[200px] px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-between transition-colors hover:border-gray-400 active:bg-gray-50 outline-none",
              organizationPreviewMainIdentifier: 
                "text-[13px] font-semibold text-gray-900 tracking-tight",
              organizationPreviewSecondaryIdentifier: 
                "text-[11px] font-medium text-gray-400",
              organizationSwitcherTriggerIcon: "text-gray-400 ml-2 w-4 h-4",
              organizationPreviewAvatarBox: "w-6 h-6 rounded-md overflow-hidden",
            },
          }}
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;