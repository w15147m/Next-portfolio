"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { deleteMessage } from "../_lib/actions";
import { useSWRConfig } from "swr";
import { getMessagesKey } from "../_lib/useMessages";
import { showToast } from "@/components/common/CustomToaster";
import WarningIcon from "@/components/ui/alert/WarningIcon";

interface DeleteMessageModalProps {
  messageId: number;
  senderName: string;
}

export default function DeleteMessageModal({
  messageId,
  senderName,
}: DeleteMessageModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const result = await deleteMessage(messageId);

      if (result.success) {
        mutate(getMessagesKey());
        showToast(result.message, "success");
        setTimeout(() => {
          closeModal();
        }, 300);
      } else {
        showToast(result.message || "Failed to delete message", "error");
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
        className="px-2 text-error-500 hover:text-error-600 hover:bg-error-50 ring-error-300 dark:text-error-400 dark:hover:bg-error-500/10 dark:ring-error-500/30"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[440px] p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/15">
            <WarningIcon className="text-error-500 fill-current" />
          </div>
          <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
            Delete Message
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the message from{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              &ldquo;{senderName}&rdquo;
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
