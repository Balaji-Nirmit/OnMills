"use server"
import { db } from "@/database/drizzle";
import { issues, userTable } from "@/database/schema";
import { IssueType, ProjectType, SprintType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { and, asc, desc, eq } from "drizzle-orm";

type CreateIssueDataProp={
    title: IssueType['itemId'],
    assigneeId: IssueType['assigneeId'] | null,
    priority: IssueType['priority'],
    description?: IssueType['description'],
    status: IssueType['status'],
    sprintId: SprintType['id'],
    quantity: IssueType['quantity'],
    unit: IssueType['unit']
}

export async function createIssue(projectId:ProjectType['id'], data:CreateIssueDataProp) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    let user = await db.select().from(userTable).where(eq(userTable.clerkId, userId)).then(res => res[0]);

    const lastIssue = await db.select().from(issues).where(and(eq(issues.projectId, projectId), eq(issues.status, data.status))).orderBy(desc(issues.order)).limit(1).then(res => res[0]);

    const newOrder = lastIssue ? lastIssue.order + 1 : 0;

    // const issue = await db.issue.create({
    //   data: {
    //     title: data.title,
    //     description: data.description,
    //     status: data.status,
    //     priority: data.priority,
    //     projectId: projectId,
    //     sprintId: data.sprintId,
    //     reporterId: user.id,
    //     assigneeId: data.assigneeId || null, // Add this line
    //     order: newOrder,
    //   },
    //   include: {
    //     assignee: true,
    //     reporter: true,
    //   },
    // });
    const issue = await db.insert(issues).values({
        itemId: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        projectId: projectId,
        sprintId: data.sprintId,
        reporterId: user.id,
        assigneeId: data.assigneeId || null,
        order: newOrder,
        quantity: data.quantity,
        unit: data.unit,
    }).returning().then(res => res[0])

    return issue;
}

export async function getIssuesForSprint(sprintId:SprintType['id']) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const issuesdata = await db.query.issues.findMany({
        where: eq(issues.sprintId,sprintId),
        orderBy:[
            asc(issues.status),
            desc(issues.order),
        ],
        with:{
            assignee:true,
            reporter:true,
            item:true
        }
    })

    return issuesdata;
}

export async function deleteIssue(issueId:IssueType['id']) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const user = await db.select().from(userTable).where(eq(userTable.clerkId, userId));

    if (!user) {
        throw new Error("User not found");
    }

    const issue = await db.query.issues.findFirst({
        where: eq(issues.id,issueId),
        with:{
            project:true
        }
    })

    if (!issue) {
        throw new Error("Issue not found");
    }
    
    // Check if the issue belongs to the user's current organization
    if (issue.project.organizationId !== orgId) {
        throw new Error("You don't have permission to delete this issue");
    }
    
    // Logic: Allow if user is the reporter OR part of the organization
    if (issue.reporterId !== user[0].id && issue.project.organizationId !== orgId) {
        throw new Error("Unauthorized");
    }

    // await db.issue.delete({ where: { id: issueId } });
    await db.delete(issues).where(eq(issues.id, issueId));

    return { success: true };
}


export async function updateIssue(
    issueId: string, 
    data: { 
        status: IssueType['status'], 
        priority: IssueType['priority'], 
        assigneeId: IssueType['assigneeId'], 
        track: IssueType['track'], 
        quantity: number // This is the quantity being MOVED/SPLIT
    }
) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    try {
        return await db.transaction(async (tx) => {
            // 1. Fetch current state to check permissions and available quantity
            const issue = await tx.query.issues.findFirst({
                where: eq(issues.id, issueId),
                with: { project: true }
            });

            if (!issue) throw new Error("Issue not found");
            if (issue.project.organizationId !== orgId) throw new Error("Unauthorized");

            const currentQty = issue.quantity;
            const moveQty = data.quantity;

            // 2. CHECK: If moving more than available
            if (moveQty > currentQty) {
                throw new Error("Insufficient quantity in this batch to split.");
            }

            // 3. CASE A: Moving the WHOLE batch (Standard Update)
            if (moveQty === currentQty) {
                await tx.update(issues).set({
                    status: data.status,
                    priority: data.priority,
                    assigneeId: data.assigneeId,
                    track: data.track,
                    updatedAt: new Date(),
                }).where(eq(issues.id, issueId));

                return await tx.query.issues.findFirst({
                    where: eq(issues.id, issueId),
                    with: { assignee: true, reporter: true, item: true },
                });
            }

            // 4. CASE B: SPLITTING (Partial quantity move)
            // Step 1: Reduce the original issue's quantity
            await tx.update(issues).set({
                quantity: currentQty - moveQty, // Remaining amount
                updatedAt: new Date(),
            }).where(eq(issues.id, issueId));

            // Step 2: Create a NEW issue for the moved quantity
            const [newSplitIssue] = await tx.insert(issues).values({
                itemId: issue.itemId,
                description: issue.description,
                projectId: issue.projectId,
                reporterId: issue.reporterId, // Keep original reporter
                assigneeId: data.assigneeId,  // New assignee for this phase
                sprintId: issue.sprintId,
                status: data.status,          // New status (e.g., PAINTING)
                priority: data.priority,
                order: issue.order,           // Usually placed in same order or end
                quantity: moveQty,            // The 40 or 60 being moved
                parentId: issue.id,           // Link to source
                isSplit: true,
                track: [...issue.track, data.status],
            }).returning();

            // Return the new split issue (the one that moved)
            return await tx.query.issues.findFirst({
                where: eq(issues.id, newSplitIssue.id),
                with: { assignee: true, reporter: true, item: true },
            });
        });
    } catch (error) {
        console.error(error);
        throw new Error(error instanceof Error ? error.message : "Error updating issue");
    }
}

export async function updateIssueOrder(updatedIssues:{status:IssueType['status'],order:IssueType['order'], id:IssueType['id'], track:IssueType['status'][]}[]) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }
    await db.transaction(async (tx) => {
        for (const issue of updatedIssues) {
            await tx.update(issues).set({
                status: issue.status,
                order: issue.order,
                track: issue.track,
                updatedAt: new Date(),
            }).where(eq(issues.id, issue.id))
        }
    })
    //(issue.track ?? []) This ensures that if the column is empty (null), the code sees [] instead

    return { success: true };
}
