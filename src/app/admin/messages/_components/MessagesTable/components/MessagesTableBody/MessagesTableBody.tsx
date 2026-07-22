"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import MessagesTableRow from "./MessagesTableRow";
import { ContactMessage } from "@/app/admin/messages/_lib/schema";

interface MessagesTableBodyProps {
  messages: ContactMessage[];
  isError: Error | undefined;
}

export default function MessagesTableBody({ messages, isError }: MessagesTableBodyProps) {
  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load messages. Please try again.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (messages.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No messages yet.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {messages.map((msg) => (
        <MessagesTableRow key={msg.id} msg={msg} />
      ))}
    </TableBody>
  );
}
