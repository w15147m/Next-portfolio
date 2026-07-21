"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import SocialFormModal from "../../SocialFormModal";

interface SocialsHeaderProps {
  userId: string;
}

export default function SocialsHeader({ userId }: SocialsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Social Links
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your portfolio social media links.
        </p>
      </div>
      <SocialFormModal
        userId={userId}
        trigger={
          <Button size="sm">
            + Add Social
          </Button>
        }
      />
    </div>
  );
}