"use client"
import { createItem } from "@/actions/items";
import { itemSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Command, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

type CreateItemProps = {
    projectTitle: string;
    projectId: string;
}
type ItemFormData = {
    name: string;
}
const CreateItem = ({ projectTitle, projectId }: CreateItemProps) => {
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const { loading: createItemLoading, fn: createItemFn, data: createdItem } = useFetch(createItem);
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(itemSchema)
    })
    const onSubmit = async (data: ItemFormData) => {
        await createItemFn(projectId, data.name);
    }
    useEffect(() => {
        if (createdItem) {
            setShowForm(false);
            router.refresh();
        }
    }, [createdItem, router])
    return (
        <>
            <div className="w-full">
                {/* header command strip */}
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#F2F0EB]">
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        className={`h-12 px-6 rounded-xl font-bold text-[13px] transition-all active:scale-95 flex items-center gap-2 ${!showForm ? "bg-[#1D1D1F] text-white hover:bg-black" : "bg-white border border-[#F2F0EB] text-[#FF7A5C]"
                            }`}
                    >
                        {!showForm ? (
                            <> <Plus size={16} strokeWidth={3} /> Add Item </>
                        ) : (
                            <> <X size={16} strokeWidth={3} /> Close </>
                        )}
                    </Button>
                </div>
                {showForm && (
                    <div className="bg-[#FAF9F6]/50 backdrop-blur-md border border-[#F2F0EB] rounded-[32px] p-2 mb-10 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden relative">
                        {/* SYSTEM LOADER OVERLAY */}
                        {createItemLoading && (
                            <div className="absolute inset-x-0 top-0 z-50">
                                <BarLoader width={"100%"} color="#FF7A5C" height={4} />
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}
                            className={`bg-white border border-[#F2F0EB] rounded-[28px] p-8 flex flex-col lg:flex-row items-center gap-6 shadow-sm transition-opacity ${createItemLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                        >
                            <div className="w-full lg:w-1/3 space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Command size={12} className="text-[#FF7A5C]" />
                                    <span className="text-[10px] font-black text-[#86868B] uppercase tracking-widest">Item</span>
                                </div>
                                <Input
                                    id="name"
                                    {...register("name")}
                                    className="h-12 bg-white border-[#F2F0EB] rounded-xl font-mono text-[13px] font-bold text-[#1D1D1F] focus-visible:ring-1 focus-visible:ring-[#FF7A5C]/30"
                                />
                                {errors.name && <p className="text-[#FF7A5C] text-[11px] font-bold mt-1 ml-1 uppercase">{errors.name.message}</p>}

                            </div>
                            <div className="hidden lg:block h-10 w-px bg-[#F2F0EB]" />
                            <div className="w-full lg:flex-1 pt-4 lg:pt-0">
                                <Button
                                    type="submit"
                                    disabled={createItemLoading}
                                    className="w-full h-14 bg-[#FF7A5C] hover:bg-black text-white rounded-xl font-bold text-[13px] transition-all shadow-lg shadow-[#FF7A5C]/15 flex items-center justify-center gap-2 group"
                                >
                                    {createItemLoading ? "Adding item..." : (
                                        <>
                                            Add Item
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
export default CreateItem;