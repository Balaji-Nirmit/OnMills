export interface UserType {
    id: string;
    clerkId: string;
    email: string;
    name: string | null;
    profileImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectType {
    id: string;
    name: string;
    key: string;
    description: string | null;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SprintType {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: 'PLANNED' | 'ACTIVE' | 'COMPLETED';
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ItemType {
    id: string;
    name: string;
    projectId: string;
}

export interface IssueType {
    id: string;
    itemId: string;
    description: string | null;
    status: "TODO" | "PURCHASE" | "STORE" | "BUFFING" | "PAINTING" | "WINDING" | "ASSEMBLY" | "PACKING" | "SALES";
    order:number;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    assigneeId: string | null;
    reporterId: string;
    projectId: string;
    sprintId: string | null;
    createdAt: Date;
    updatedAt: Date;
    track: IssueType["status"][];
    quantity: number;
    unit: 'PIECES' | 'KILOGRAM' | 'UNITS' | 'GRAM' | 'TONNE';
    parentId: string | null;
    isSplit: boolean;
}

export type DetailedIssue = IssueType & {
    project?: ProjectType;
    assignee: UserType | null;
    reporter: UserType;
    item: ItemType;
};

export interface ProcessStages {
    [stageName: string]: number;
}

export interface ComponentProcessMap {
    [componentName: string]: ProcessStages;
  }