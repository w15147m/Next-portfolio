"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { markMessageAsRead } from "../_lib/actions";
import { useSWRConfig } from "swr";
import { getMessagesKey } from "../_lib/useMessages";
import { showToast } from "@/components/common/CustomToaster";
import type { ContactMessage } from "../_lib/schema";
import DeleteMessageModal from "./DeleteMessageModal";

interface ViewMessageModalProps {
  msg: ContactMessage;
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ViewMessageModal({ msg }: ViewMessageModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [isMarking, setIsMarking] = useState(false);
  const { mutate } = useSWRConfig();

  const handleOpen = async () => {
    openModal();
    if (!msg.isRead) {
      try {
        setIsMarking(true);
        await markMessageAsRead(msg.id);
        mutate(getMessagesKey());
      } finally {
        setIsMarking(false);
      }
    }
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={handleOpen}>
        View
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[560px] p-6 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {msg.subject || "No Subject"}
            </h4>
            {!msg.isRead && (
              <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                New
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">From: </span>
              {msg.name} &lt;{msg.email}&gt;
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">Received: </span>
              {formatDate(msg.createdAt)}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 dark:border-neutral-800 dark:bg-white/5 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {msg.message}
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <DeleteMessageModal messageId={msg.id} senderName={msg.name} />
            <Button size="sm" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
