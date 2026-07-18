"use client";

import React, { useState } from "react";
import ImageUpload from "@/components/ui/ImageUpload";

export default function UploadTestPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Test Reusable Image Upload</h1>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Upload Image</label>
          <ImageUpload 
            label="Upload Cover"
            onUploadSuccess={(url) => setImageUrl(url)}
          />
        </div>

        {imageUrl && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-semibold mb-2">Uploaded Temporary Image URL:</h3>
            <code className="block p-2 bg-gray-100 dark:bg-gray-900 rounded break-all text-sm text-brand-500">
              {imageUrl}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
