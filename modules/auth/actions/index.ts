"use server";

import { db } from "@/lib/db";
import { usersTable } from "@/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";


export const onBoardUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return {
                success: false,
                error: "No authenticated user found",
            }
        }

        const { id, firstName, lastName, imageUrl, emailAddresses } = user;

        const fullName: string | null = firstName && lastName ? `${firstName} ${lastName}` : firstName ?? lastName ?? null

        const newUser = await db.insert(usersTable).values({
            clerkId: id,
            name: fullName,
            image: imageUrl ?? null,
            email: emailAddresses[0]?.emailAddress ?? null,
        }).onConflictDoUpdate({
            target: usersTable.clerkId,
            set: {
                name: fullName,
                image: imageUrl,
                email: emailAddresses[0]?.emailAddress || "",
                updatedAt: new Date(),
            }
        }).returning();

        return {
            success: true,
            user: newUser,
            messge: "User onboarded successfully"
        }
    } catch (error) {
        console.error("❌ Error onboarding user: ", error);
        return {
            success: false,
            error: "Failed to onboard user",
        }
    }
}


export const getCurrentUser = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return null;
        }

        const dbUser = await db.select({
            id: usersTable.id,
            email: usersTable.email,
            name: usersTable.name,
            image: usersTable.image,
        }).from(usersTable)
        .where(eq(usersTable.clerkId, user.id));

        return dbUser;

    } catch (error) {
        console.error("❌ Error fetching current user:", error);
        return null;
    }
}