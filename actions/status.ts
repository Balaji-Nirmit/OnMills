"use server"
import { db } from "@/database/drizzle";
import { projectStatusTable, projectTable, userTable } from "@/database/schema";
import { ProjectStatusType, ProjectType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function createProjectStatus(projectId: ProjectType['id'], projectStatusName: ProjectStatusType['name'], projectStatusOrder: ProjectStatusType['order']) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized access");
    }

    try{
        const project = await db.select().from(projectTable).where(eq(projectTable.id, projectId)).then(res => res[0])
    
        if (!project || project.organizationId !== orgId) {
            throw new Error("Project not found");
        }
    
        const projectStatus = await db.insert(projectStatusTable).values({
            name: projectStatusName,
            key: projectStatusName,
            order: projectStatusOrder,
            projectId: projectId
        }).returning().then(res => res[0]);
        return projectStatus
    }catch(error){
        throw new Error("Error creating stage")
    }

}

export async function getProjectStatus(projectId: ProjectType['id']) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized access");
    }

    try{
        const project = await db.select().from(projectTable).where(eq(projectTable.id, projectId)).then(res => res[0]);
    
        if (!project || project.organizationId !== orgId) {
            throw new Error("Project not found");
        }
    
        const projectStatuss = await db.select().from(projectStatusTable).where(eq(projectStatusTable.projectId, projectId)).orderBy(projectStatusTable.order);
        return projectStatuss;
    }catch(error){
        throw new Error("Error fetching project projectStatuss")
    }

}

export async function deleteProjectStatus(projectStatusId: ProjectStatusType['id'], projectId: ProjectType['id']) {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
        throw new Error("Unauthorized access")
    }
    try{
        const user = await db.select().from(userTable).where(eq(userTable.clerkId, userId));
    
        if (!user) {
            throw new Error("User not found");
        }
        const projectStatus = await db.query.projectStatusTable.findFirst({
            where: eq(projectStatusTable.id, projectStatusId),
            with: {
                project: true
            }
        })
        if (!projectStatus) {
            throw new Error("Issue not found");
        }
    
        // Check if the issue belongs to the user's current organization
        if (projectStatus.project.organizationId !== orgId) {
            throw new Error("You don't have permission to delete this issue");
        }
    
        // await db.issue.delete({ where: { id: issueId } });
        await db.delete(projectStatusTable).where(and(eq(projectStatusTable.id, projectStatusId),eq(projectStatusTable.projectId,projectId)));
    
        return { success: true };
    }catch(error){
        throw new Error("Error deleting stage")
    }
}