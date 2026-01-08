"use client";

import { OrganizationList, useOrganization, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check if the user is here specifically to create a new org
  const isJustCreating = searchParams.get("justCreate") === "true";

  useEffect(() => {
    // ONLY redirect automatically if:
    // 1. We have an organization
    // 2. We ARE NOT here via the "Create Organization" button (justCreate is false)
    if (orgLoaded && organization && !isJustCreating) {
      router.push(`/organization/${organization.slug}`);
    }
  }, [organization, orgLoaded, router, isJustCreating]);

  if (!orgLoaded || !userLoaded) return null;

  return (
    <div className="flex justify-center items-center pt-14">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:slug"
        afterSelectOrganizationUrl="/organization/:slug"
      />
    </div>
  );
}