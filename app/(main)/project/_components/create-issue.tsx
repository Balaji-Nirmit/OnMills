"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "@/hooks/use-fetch";
import { createIssue } from "@/actions/issues";
import { getOrganizationUsers } from "@/actions/organization";
import { issueSchema } from "@/app/lib/validators";
import { X } from "lucide-react";
import { IssueType, ProjectType, SprintType } from "@/lib/types";
type Props={
  isOpen:boolean,
  onClose:()=>void,
  sprintId:SprintType['id'],
  status:IssueType['status'],
  projectId:ProjectType['id'],
  onIssueCreated:()=>void,
  orgId:ProjectType['organizationId']
}
export default function IssueCreationDrawer({
  isOpen,
  onClose,
  sprintId,
  status,
  projectId,
  onIssueCreated,
  orgId,
}:Props) {
  const {
    loading: createIssueLoading,
    fn: createIssueFn,
    data: newIssue,
  } = useFetch(createIssue);

  const {
    fn: fetchUsers,
    data: users,
  } = useFetch(getOrganizationUsers);

  const {
    control,
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: { priority: "MEDIUM", description: "", assigneeId: "" },
  });

  useEffect(() => {
    if (isOpen && orgId) fetchUsers(orgId);
  }, [isOpen, orgId]);

  const unlockScreen = () => {
    document.body.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    if (newIssue) {
      reset();
      onClose();
      onIssueCreated();
      unlockScreen();
    }
  }, [newIssue, onClose, onIssueCreated, reset]);

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          unlockScreen();
        }
      }}
    >
      <DrawerContent className="bg-white/70 backdrop-blur-[30px] border-none rounded-t-[32px] max-h-[92vh] outline-none">
        {/* SUBTLE AMBER GLOW LENS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#FF7A5C]/40 blur-md pointer-events-none" />
        
        <div className="mx-auto w-10 h-1 bg-black/10 rounded-full mt-4" />
        
        <DrawerHeader className="px-10 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-[28px] font-semibold tracking-tight text-[#1D1D1F]">
              New Issue
            </DrawerTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => { onClose(); unlockScreen(); }} 
              className="rounded-full hover:bg-black/5"
            >
              <X size={18} className="text-[#86868B]" />
            </Button>
          </div>
        </DrawerHeader>

        <form onSubmit={handleSubmit((data) => createIssueFn(projectId, { ...data, status, sprintId }))} className="px-10 py-2 space-y-8 overflow-y-auto">
          
          {/* MINIMALIST TITLE FIELD */}
          <div className="pt-2">
            <Input 
              {...register("title")} 
              placeholder="Issue title"
              className="h-12 bg-transparent border-none border-b border-black/5 rounded-none px-0 text-[20px] font-medium tracking-tight focus-visible:ring-0 focus-visible:border-[#FF7A5C] transition-all placeholder:text-black/20 shadow-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 ml-0.5">Assignee</p>
              <Controller
                name="assigneeId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-10 bg-black/5 border-none rounded-xl px-4 font-semibold text-[14px] shadow-none">
                      <SelectValue placeholder="Add someone..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none bg-white/80 backdrop-blur-2xl shadow-xl">
                      {users?.map((user) => (
                        <SelectItem key={user.id} value={user.id} className="rounded-lg">{user?.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 ml-0.5">Priority</p>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-10 bg-black/5 border-none rounded-xl px-4 font-semibold text-[14px] shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none bg-white/80 backdrop-blur-2xl shadow-xl">
                      {["LOW", "MEDIUM", "HIGH", "URGENT"].map(p => (
                        <SelectItem key={p} value={p} className="rounded-lg">{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2" data-color-mode="light">
            <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 ml-0.5">Description</p>
            <div className="rounded-2xl border border-black/5 overflow-hidden">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <MDEditor value={field.value} onChange={field.onChange} preview="edit" height={220} className="bg-white/30!" />
                )}
              />
            </div>
          </div>

          <div className="pt-6 pb-12">
            <Button
              type="submit"
              disabled={createIssueLoading}
              className="w-full h-14 bg-[#1D1D1F] hover:bg-black text-white rounded-2xl text-[15px] font-bold transition-all active:scale-[0.99] shadow-md shadow-black/10"
            >
              {createIssueLoading ? "Creating..." : "Create Issue"}
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}