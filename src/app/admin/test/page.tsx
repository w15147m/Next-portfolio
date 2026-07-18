"use client";

import React, { useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";
import { submitProjectAction } from "./actions";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Checkbox from "@/components/form/input/Checkbox";

export default function UploadTestPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("image", imageUrl);

    const res = await submitProjectAction(formData);
    setResult(res);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Test Reusable Image Upload</h1>

      {result && (
        <div className={`p-4 mb-6 rounded-lg ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Project Name</label>
          <Input name="projectName" placeholder="Enter project name" required />
        </div>

        <div>
          <label className="block mb-2 font-medium">Project Image</label>
          <ImageUpload 
            label="Upload Project Cover"
            onUploadSuccess={(url) => setImageUrl(url)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Checkbox name="forceFail" />
          <span>Simulate Database Failure (Deletes temp image)</span>
        </div>

        <Button type="submit">Submit Form</Button>
      </form>
    </div>
  );
}
