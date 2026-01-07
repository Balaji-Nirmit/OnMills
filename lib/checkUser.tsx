import { db } from "@/database/drizzle";
import { userTable } from "@/database/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.select().from(userTable).where(eq(userTable.clerkId, user.id))
    console.log(loggedInUser);

    if (loggedInUser.length > 0) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.insert(userTable).values({
        clerkId: user.id,
        name: name,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl
    })

    return newUser;
  } catch (error) {
    console.log(error);
  }
};