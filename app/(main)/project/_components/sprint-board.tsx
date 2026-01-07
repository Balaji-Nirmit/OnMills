'use client'
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import IssueCreationDrawer from "./create-issue";
import { useEffect, useState } from "react";
import SprintManager from "./sprint-manager";
import statuses from "@/data/status.json"
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { getIssuesForSprint, updateIssueOrder } from "@/actions/issues";
import { BarLoader } from "react-spinners";
import IssueCard from "@/components/issue-card";
import { toast } from "sonner";
import BoardFilters from "./board-filters";
import { Plus, CircleDot, Terminal, PackageOpen } from "lucide-react";
import { IssueType, ProjectType, SprintType, UserType } from "@/lib/types";

export type DetailedIssue = IssueType & {
    assignee: UserType | null;
    reporter: UserType;
};

type Props = {
    sprints: SprintType[],
    projectId: ProjectType['id'],
    orgId: ProjectType['organizationId']
}

function reorder(list: any[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

const SprintBoard = ({ sprints, projectId, orgId }: Props) => {
    const [currentSprint, setCurrentSprint] = useState<SprintType | undefined>(
        sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
    );
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<IssueType['status']>("TODO");
    
    const { loading: issuesLoading, error: issuesError, fn: fetchIssues, data: issues, setData: setIssues } = useFetch<DetailedIssue[], [string]>(getIssuesForSprint);
    const [filteredIssues, setFilteredIssues] = useState<DetailedIssue[] | null>(null);
    const { fn: updateIssueOrderFn, loading: updateIssuesLoading } = useFetch<any, [DetailedIssue[]]>(updateIssueOrder);

    const onDragEnd = async (result: DropResult) => {
        if (!currentSprint || !issues) return;
        if (currentSprint.status === "PLANNED") {
            toast.warning("Initialization Required: Start the sprint to synchronize the board.");
            return;
        }
        const { destination, source } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newOrderedData = [...issues];
        const sourceList = newOrderedData.filter(list => list.status === source.droppableId);
        const destinationList = newOrderedData.filter(list => list.status === destination.droppableId);

        if (source.droppableId === destination.droppableId) {
            const reorderedCards = reorder(sourceList, source.index, destination.index);
            reorderedCards.forEach((card, i) => { card.order = i; });
        } else {
            const [movedCard] = sourceList.splice(source.index, 1);
            movedCard.status = destination.droppableId as IssueType['status'];
            destinationList.splice(destination.index, 0, movedCard);
            sourceList.forEach((card, i) => { card.order = i; });
            destinationList.forEach((card, i) => { card.order = i; });
        }

        const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
        setIssues(sortedIssues);
        updateIssueOrderFn(sortedIssues);
    }

    useEffect(() => {
        if (currentSprint?.id) fetchIssues(currentSprint.id);
    }, [currentSprint?.id]);

    useEffect(() => { setFilteredIssues(issues); }, [issues]);

    const handleFilterChange = (newFilteredIssues: DetailedIssue[]) => {
        setFilteredIssues(newFilteredIssues);
    }

    if (issuesError) return (
        <div className="p-12 text-center bg-white border border-red-100 rounded-[32px]">
            <Terminal className="mx-auto text-red-400 mb-4" size={32} />
            <p className="text-[13px] font-bold text-red-500 uppercase tracking-widest">Protocol_Error: Connection failed.</p>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* THE FIX: Only render SprintManager if currentSprint is defined */}
            {currentSprint ? (
                <div className="bg-white/50 backdrop-blur-xl border border-[#F2F0EB] rounded-[32px] p-2 shadow-sm">
                    <SprintManager 
                        sprint={currentSprint} 
                        setSprint={setCurrentSprint} 
                        sprints={sprints} 
                        projectId={projectId} 
                    />
                </div>
            ) : (
                <div className="p-12 text-center bg-[#FAF9F6] border-2 border-dashed border-[#E5E3DD] rounded-[32px]">
                    <PackageOpen className="mx-auto text-[#86868B] mb-4" size={32} />
                    <p className="text-[12px] font-bold text-[#86868B] uppercase tracking-widest">No_Active_Sprints_Found</p>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                {issues && !issuesLoading && <BoardFilters issues={issues} onFilterChange={handleFilterChange} />}
                <div className="flex items-center gap-4 text-[#86868B]">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <CircleDot size={12} className="text-[#34C759] animate-pulse" />
                        Live_Board_Sync
                    </span>
                </div>
            </div>

            {(updateIssuesLoading || issuesLoading) && <BarLoader width={"100%"} color="#FF7A5C" height={3} />}

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-2">
                    {statuses.map((column) => (
                        <div key={column.key} className="flex flex-col min-h-37.5">
                            <div className="flex items-center justify-between mb-6 px-1">
                                <h3 className="text-[13px] font-black text-[#1D1D1F] uppercase tracking-[0.15em]">{column.name}</h3>
                                {column.key === "TODO" && currentSprint?.status !== "COMPLETED" && (
                                    <Button onClick={() => { setSelectedStatus(column.key as IssueType['status']); setIsDrawerOpen(true); }} variant="ghost" size="icon" className="h-8 w-8 rounded-full text-[#FF7A5C]">
                                        <Plus size={18} strokeWidth={2.5} />
                                    </Button>
                                )}
                            </div>
                            <Droppable droppableId={column.key}>
                                {(provided, snapshot) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className={`flex-1 rounded-[28px] p-3 transition-colors ${snapshot.isDraggingOver ? "bg-[#FFF0EA]/40 border-2 border-dashed border-[#FF7A5C]/20" : "bg-[#FAF9F6]/40"}`}>
                                        <div className="space-y-4">
                                            {filteredIssues?.filter(i => i.status === column.key).map((issue, index) => (
                                                <Draggable key={issue.id} draggableId={issue.id} index={index} isDragDisabled={updateIssuesLoading}>
                                                    {(provided, snapshot) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging ? "z-50 rotate-3" : ""}>
                                                            <IssueCard 
                                                                issue={issue} 
                                                                onDelete={() => currentSprint?.id && fetchIssues(currentSprint.id)}
                                                                onUpdate={(updated) => setIssues((prev) => (prev || []).map(i => i.id === updated.id ? { ...i, ...updated } : i))}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
            
            {currentSprint && (
              <IssueCreationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} sprintId={currentSprint.id} status={selectedStatus} projectId={projectId} onIssueCreated={() => fetchIssues(currentSprint.id)} orgId={orgId} />
            )}
        </div>
    )
}
export default SprintBoard;