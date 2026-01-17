"use server"
import { db } from "@/database/drizzle";
import { itemTable, projectTable } from "@/database/schema";
import { ItemType, ProjectType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function createItem(projectId: ProjectType['id'], itemName: ItemType['name']) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    const project = await db.select().from(projectTable).where(eq(projectTable.id, projectId)).then(res => res[0])
    
    if (!project || project.organizationId !== orgId) {
        throw new Error("Project not found");
    }

    const item =await db.insert(itemTable).values({
        name:itemName,
        projectId:projectId
    }).returning().then(res=>res[0]);
    return item
}

export async function getProjectItems(projectId: ProjectType['id']){
    const {userId, orgId} = await auth();

    if(!userId || !orgId){
        throw new Error("Unauthorized");
    }

    const project = await db.select().from(projectTable).where(eq(projectTable.id, projectId)).then(res => res[0])

    if (!project || project.organizationId !== orgId) {
        throw new Error("Project not found");
    }

    const items = await db.select().from(itemTable).where(eq(itemTable.projectId,projectId))
    return items;
}