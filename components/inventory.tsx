// Inventory dashboard
import statuses from "@/data/status.json";
import { ComponentProcessMap, DetailedIssue } from "@/lib/types";
type Prop = {
    filteredIssues:DetailedIssue[] | null
}
const Inventory = ({filteredIssues}:Prop) => {
    const items = [...new Set(filteredIssues?.map(d => d.item.name))];
    const inventoryDashboard:ComponentProcessMap = {};
    filteredIssues?.forEach(i => {
        const n = i.item.name;
        const s = i.status;
        const q = i.quantity
        if (!inventoryDashboard[n]) {
            inventoryDashboard[n] = {};
        }
        if (!inventoryDashboard[n][s]) {
            inventoryDashboard[n][s] = 0;
        }
        inventoryDashboard[n][s] += q;
    });

    //  this is the inventory Dashboard structure
    //  {
    //     "TABLE BASE": {
    //       "Purchase": 40,
    //       "Store": 30,
    //       "Buffing": 30
    //     },
    //     "GEAR BOX": {
    //       "Purchase": 20,
    //       "Assembly": 10
    //     }
    //   }

    const STAGE_STYLES = {
        SALES: "bg-green-100 text-green-700 border-green-200",
        PURCHASE: "bg-blue-100 text-blue-700 border-blue-200",
        TODO: "bg-purple-100 text-purple-700 border-purple-200",
        DEFAULT: "bg-gray-100 text-gray-700 border-gray-200",
    };


    return (
        <>
            <div className="rounded-3xl overflow-hidden bg-white/70 backdrop-blur-2xl  border border-white/50 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-175">
                        <thead>
                            <tr className="border-b border-gray-200/50">
                                <th className="text-left px-8 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">Item</th>
                                {statuses.map(stage => (
                                    <th
                                        key={stage.key}
                                        className={`
                             px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider
                             rounded-full 
                             ${STAGE_STYLES[stage.key as keyof typeof STAGE_STYLES] || STAGE_STYLES.DEFAULT}
                           `}
                                    >
                                        {stage.key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/60">
                            {filteredIssues && filteredIssues.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="py-4 text-center">
                                        <div className="max-w-md mx-auto">
                                            <div className="text-7xl mb-6 text-gray-150">📂</div>
                                            <p className="text-xl font-medium text-gray-700">All clear</p>
                                            <p className="text-base text-gray-500 mt-3">
                                                No issues in this sprint yet. Create one to get started.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map(item => (
                                    <tr key={item} className="hover:bg-white/40 transition-all duration-300">
                                        <td className="px-8 py-6">{item}</td>
                                        {statuses.map(stage => (
                                            <td key={stage.key} className="px-8 py-6 text-center">
                                                {inventoryDashboard[item]?.[stage.key] ?? '.'}
                                            </td>
                                        ))}
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Inventory;