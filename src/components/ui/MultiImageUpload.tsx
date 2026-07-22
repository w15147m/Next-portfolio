"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { uploadImage } from "@/lib/image-client";

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({ images, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = acceptedFiles.map((file) => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...images, ...uploadedUrls]);
    } catch (err) {
      console.error("Multi image upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    disabled: isUploading,
  });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Dropzone Box */}
        <div
          {...getRootProps()}
          className={`border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer min-h-[120px] transition hover:border-brand-500 bg-gray-50 dark:bg-neutral-950 ${
            isDragActive ? "border-brand-500 bg-gray-100 dark:bg-gray-800" : ""
          }`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <span className="text-xs text-brand-500 font-medium">Uploading...</span>
          ) : (
            <div className="text-center">
              <svg
                className="mx-auto h-6 w-6 text-gray-400 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">Add Images</span>
            </div>
          )}
        </div>

        {/* Uploaded Thumbnails */}
        {images.map((url, idx) => (
          <div
            key={idx}
            className="relative h-28 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 group bg-gray-100 dark:bg-neutral-900"
          >
            <Image src={url} alt={`Project image ${idx + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1.5">
              <span className="text-[10px] font-semibold text-white bg-black/60 px-1.5 py-0.5 rounded">
                {idx === 0 ? "Main" : `Image ${idx + 1}`}
              </span>
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="bg-error-500 text-white rounded-full p-1 hover:bg-error-600 transition"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
