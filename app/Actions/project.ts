"use server";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/db";
import { revalidatePath } from "next/cache";
export const projectAction = async (formData: FormData) => {
  try {
    // Extract data from FormData
    const title = formData.get("title") as string;
    const technologiesString = formData.get("technologies") as string;
    const description = formData.get("description") as string;
    const features = formData.get("features") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const image = formData.get("image") as File | null;

    // Parse technologies back to array
    const technologies = JSON.parse(technologiesString);

    // Handle image upload if present
    let imageUrl = null;
    if (image && image.size > 0) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const payload = {
      title,
      technologies,
      description,
      features,
      githubUrl,
      liveUrl,
      imageUrl,
      createdAt: new Date(),
    };
    

    // Uncomment when ready to save to database
    const { db } = await connectToDatabase();
    await db.collection("projects").insertOne(payload);

    revalidatePath("/");
    
    return {
      success: true,
      message: "Project added successfully",
      data: payload,
    };
  } catch (error) {
    console.error("Error adding project:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error adding project",
    };
  }
};
