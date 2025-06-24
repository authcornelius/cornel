"use server";

import { connectToDatabase } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface payload {
  company: string;
  position: string;
  location: string;
  start: string;
  end: string;
  description: string;
  technologies: string[];
}

export const experienceAction = async ({ payload }: { payload: payload }) => {
  const {db} = await connectToDatabase();
  try {
    await db.collection("experiences").insertOne(payload);
    revalidatePath("/")
    return {
        success: true,
        message: "Experience added successfully",
    }
  } catch (error) {
    console.log(error);
    return {
        success: false,
        message: "Error adding experience",
    }
  }
};
