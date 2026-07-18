"use server";

import { commitImage, deleteTempImage } from "@/lib/file-utils";

export async function submitProjectAction(formData: FormData) {
  const imageUrl = formData.get("image") as string;
  const projectName = formData.get("projectName") as string;
  const forceFail = formData.get("forceFail") === "on";

  try {
    if (forceFail) {
      throw new Error("Simulated database failure!");
    }

    // Move image from temp to permanent "project" folder
    const finalUrl = await commitImage(imageUrl, "project");

    return { success: true, message: `Saved project: ${projectName}. Image permanent URL: ${finalUrl}` };
  } catch (error: any) {
    // If saving to DB fails, clean up the temp image
    await deleteTempImage(imageUrl);
    return { success: false, message: error.message };
  }
}
