import { DetailedIssue, ProjectStatusType } from "@/lib/types";
import { ArrowRight, RotateCcw } from "lucide-react";

type Prop = {
    filteredIssues: DetailedIssue[] | null;
    statuses: ProjectStatusType[];
};

const IssueLifecycleDisplay = ({ filteredIssues, statuses }: Prop) => {
    const statusMap = new Map(statuses.map(s => [s.id, s]));
    const orderedStatuses = [...statuses].sort((a, b) => a.order - b.order);

    return (
        <div className="p-4 text-[#3D3D3D] space-y-8">
            {filteredIssues?.length === 0 && (
                <div className="py-16 text-center border rounded-xl bg-white">
                    <p className="text-sm text-black/40 italic">
                        Inventory track is empty
                    </p>
                </div>
            )}

            {filteredIssues?.map(issue => {
                const track = issue.track ?? [];

                return (
                    <div key={issue.id} className="space-y-3">
                        <h2 className="text-lg font-semibold text-[#1D1D1F]">
                            {issue.item.name}
                        </h2>

                        <div className="rounded-xl bg-white overflow-x-auto">
                            <div className="flex items-center gap-3 px-4 min-w-max">
                                {track.map((statusId, idx) => {
                                    const status = statusMap.get(statusId);
                                    if (!status) return null;

                                    const isLast = idx === track.length - 1;
                                    const isRepeat = track.slice(0, idx).includes(statusId);
                                    const phase =
                                        orderedStatuses.findIndex(s => s.id === statusId) + 1;

                                    return (
                                        <div key={`${statusId}-${idx}`} className="flex items-center gap-3">
                                            <div
                                                className={`px-4 py-3 rounded-lg border text-sm min-w-35
                                                    ${isLast
                                                        ? "border-[#FF7A51] bg-[#FFF6F2]"
                                                        : "border-black/10 bg-white"}
                                                `}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-[10px] font-semibold text-black/30">
                                                        STEP {idx + 1}
                                                    </span>

                                                    {isRepeat && (
                                                        <span className="flex items-center gap-1 text-[9px] font-semibold text-[#FF7A51]">
                                                            <RotateCcw size={10} />
                                                            REVISIT
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="font-semibold uppercase text-[12px]">
                                                    {status.name}
                                                </div>

                                                <div className="text-[10px] text-black/40">
                                                    Phase {phase}
                                                </div>
                                            </div>

                                            {!isLast && (
                                                <ArrowRight
                                                    size={14}
                                                    className="text-black/30 shrink-0"
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default IssueLifecycleDisplay;
