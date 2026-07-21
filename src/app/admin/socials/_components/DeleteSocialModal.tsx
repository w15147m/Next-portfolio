"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { deleteSocial, SocialFormState } from "../actions";
import { useSWRConfig } from "swr";
import { getSocialsKey } from "../useSocials";
import { showToast } from "@/components/common/CustomToaster";

interface DeleteSocialModalProps {
  socialId: number;
  socialName: string;
  userId: string;
}

export default function DeleteSocialModal({
  socialId,
  socialName,
  userId,
}: DeleteSocialModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteSocial(socialId);
    setIsLoading(false);

    if (result.success) {
      mutate(getSocialsKey(userId));
      showToast(result.message, "success");
      setTimeout(() => {
        closeModal();
      }, 60);
    } else {
      showToast(result.message || "Failed to delete social link", "error");
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={openModal} className="text-error-500 border-error-300 hover:bg-error-50 dark:border-error-500/30 dark:hover:bg-error-500/10">
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[440px] p-6">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/15">
            <svg className="text-error-500 fill-current" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M20.3499 12.0004C20.3499 16.612 16.6115 20.3504 11.9999 20.3504C7.38832 20.3504 3.6499 16.612 3.6499 12.0004C3.6499 7.38881 7.38833 3.65039 11.9999 3.65039C16.6115 3.65039 20.3499 7.38881 20.3499 12.0004ZM11.9999 22.1504C17.6056 22.1504 22.1499 17.6061 22.1499 12.0004C22.1499 6.3947 17.6056 1.85039 11.9999 1.85039C6.39421 1.85039 1.8499 6.3947 1.8499 12.0004C1.8499 17.6061 6.39421 22.1504 11.9999 22.1504ZM13.0008 16.4753C13.0008 15.923 12.5531 15.4753 12.0008 15.4753L11.9998 15.4753C11.4475 15.4753 10.9998 15.923 10.9998 16.4753C10.9998 17.0276 11.4475 17.4753 11.9998 17.4753L12.0008 17.4753C12.5531 17.4753 13.0008 17.0276 13.0008 16.4753ZM11.9998 6.62898C12.414 6.62898 12.7498 6.96476 12.7498 7.37898L12.7498 13.0555C12.7498 13.4697 12.414 13.8055 11.9998 13.8055C11.5856 13.8055 11.2498 13.4697 11.2498 13.0555L11.2498 7.37898C11.2498 6.96476 11.5856 6.62898 11.9998 6.62898Z" />
            </svg>
          </div>

          <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
            Delete Social Link
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              &ldquo;{socialName}&rdquo;
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