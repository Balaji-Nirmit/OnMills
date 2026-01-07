"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserType } from "@/lib/types";

interface UserAvatarProps {
  user: UserType | null | undefined;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  // Logic to generate initials or fallback
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center gap-2.5 group cursor-default">
      {/* 1. THE GLASS LENS (Vision Pro Style) */}
      <div className="relative p-[1.5px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-full transition-all duration-500 group-hover:bg-white/30 group-hover:border-[#FF7A5C]/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        
        {/* SUBTLE AMBER GLOW EFFECT */}
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#FF7A5C]/0 to-[#FF7A5C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <Avatar className="h-7 w-7 rounded-full border border-white/40 shadow-inner">
          {user?.profileImageUrl && (
            <AvatarImage 
              src={user.profileImageUrl} 
              alt={user.name ?? "User"} 
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-white/5 backdrop-blur-sm text-[#1D1D1F] text-[10px] font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        {/* FLOATING GEOMETRY INDICATOR */}
        {user && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#34C759] border-[1.5px] border-white/90 rounded-full shadow-sm" />
        )}
      </div>

      {/* 2. TYPOGRAPHY - TRANSPARENT LENS FEEL */}
      <span className="text-[13px] font-medium text-[#1D1D1F]/80 tracking-tight group-hover:text-[#FF7A5C] transition-all duration-300">
        {user?.name ? user.name : "Unassigned"}
      </span>
    </div>
  );
};

export default UserAvatar;