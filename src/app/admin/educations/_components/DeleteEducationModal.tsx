"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { deleteEducation } from "../_lib/actions";
import { useSWRConfig } from "swr";
import { getEducationsKey } from "../_lib/useEducations";
import { showToast } from "@/components/common/CustomToaster";
import WarningIcon from "@/components/ui/alert/WarningIcon";

interface DeleteEducationModalProps {
  educationId: number;
  institutionName: string;
  userId: string;
}

export default function DeleteEducationModal({
  educationId,
  institutionName,
  userId,
}: DeleteEducationModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const result = await deleteEducation(educationId);

      if (result.success) {
        mutate(getEducationsKey(userId));
        showToast(result.message, "success");
        setTimeout(() => {
          closeModal();
        }, 300);
      } else {
        showToast(result.message || "Failed to delete education record", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={openModal}
        className="text-error-500 border-error-300 hover:bg-error-50 dark:border-error-500/30 dark:hover:bg-error-500/10"
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[440px] p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/15">
            <WarningIcon className="text-error-500 fill-current" />
          </div>

          <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
            Delete Education
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete record for{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              &ldquo;{institutionName}&rdquo;
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Button size="sm" variant="outline" onClick={closeModal} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-error-500 hover:bg-error-600 text-white"
            >
              {isLoading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
