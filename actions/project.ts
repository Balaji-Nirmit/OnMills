"use server"
import { db } from "@/database/drizzle";
import { projectTable, userTable } from "@/database/schema";
import { ProjectType } from "@/lib/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

type CreateProjectType = {
    name: ProjectType['name'],
    key: ProjectType['key'],
    description: ProjectType['description'],
}
export async function createProject(data: CreateProjectType) {
    const { userId, orgId } = await auth();
    if (!userId) throw new Error("unauthorized");
    if (!orgId) throw new Error("Organization not selected");

    const client = await clerkClient();
    const { data: membershipList } = await client.organizations.getOrganizationMembershipList({
        organizationId: orgId
    });

    // Use optional chaining (?.) to safely access userId
    const userMembership = membershipList.find(
        (membership) => membership.publicUserData?.userId === userId
    );

    if (!userMembership || userMembership.role !== "org:admin") {
        throw new Error("Only organization admins can create projects");
    }

    try {
        // Drizzle insert with returning()
        const [project] = await db.insert(projectTable).values({
            name: data.name,
            key: data.key,
            description: data.description,
            organizationId: orgId
        }).returning();

        return project;
    } catch (error: any) {
        throw new Error("Error creating project");
    }
}


export async function deleteProject(projectId: ProjectType['id']) {
    const { userId, orgId, orgRole } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    if (orgRole !== "org:admin") {
        throw new Error("Only organization admins can delete projects");
    }

    try {
        const project = await db.select().from(projectTable).where(eq(projectTable.id, projectId))

        if (!project || project[0].organizationId !== orgId) {
            throw new Error(
                "Project not found or you don't have permission to delete it"
            );
        }

        await db.delete(projectTable).where(eq(projectTable.id, projectId))

        return { success: true };
    } catch (error) {
        throw new Error("Error deleting project")
    }

}


export async function getProject(projectId: ProjectType['id']) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    try {
        // Find user to verify existence
        const user = await db.select().from(userTable).where(eq(userTable.clerkId, userId));


        if (!user) {
            throw new Error("User not found");
        }

        const project = await db.query.projectTable.findFirst({
            where: eq(projectTable.id, projectId),
            with: {
                sprints: {
                    orderBy: (sprints, { asc }) => [asc(sprints.startDate)],
                },
            }
        })
        if (!project) {
            throw new Error("Project not found");
        }

        // Verify project belongs to the organization
        if (project.organizationId !== orgId) {
            return null;
        }
        return project;
    }catch(error){
        throw new Error("Error fetching project")
    }
}