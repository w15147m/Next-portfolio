"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import ViewMessageModal from "../../../ViewMessageModal";
import DeleteMessageModal from "../../../DeleteMessageModal";
import { ContactMessage } from "@/app/admin/messages/_lib/schema";

interface MessagesTableRowProps {
  msg: ContactMessage;
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function MessagesTableRow({ msg }: MessagesTableRowProps) {
  return (
    <TableRow
      className={`border-b border-gray-100 dark:border-neutral-900 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!msg.isRead ? "bg-brand-50/40 dark:bg-brand-500/5" : ""
        }`}
    >
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-2">
          {!msg.isRead && (
            <span className="inline-block h-2 w-2 rounded-full bg-brand-500 flex-shrink-0" />
          )}
          <span className={`text-sm ${!msg.isRead ? "font-semibold text-gray-800 dark:text-white/90" : "text-gray-600 dark:text-gray-400"}`}>
            {msg.name}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
        {msg.email}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
        {msg.subject || "—"}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
        {msg.message}
      </TableCell>
      <TableCell className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
        {formatDate(msg.createdAt)}
      </TableCell>
      <TableCell className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <ViewMessageModal msg={msg} />
          <DeleteMessageModal messageId={msg.id} senderName={msg.name} />
        </div>
      </TableCell>
    </TableRow>
  );
}
