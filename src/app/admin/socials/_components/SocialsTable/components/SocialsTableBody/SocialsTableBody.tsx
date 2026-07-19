
"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import SocialsTableRow from "../SocialsTableRow";
import type { Social, SocialFormState } from "../../../../actions";

interface SocialsTableBodyProps {
  socials: Social[];
  isLoading: boolean;
  userId: string;
  onUpdated: (social: Social, result: SocialFormState) => void;
  onDeleted: (id: number, result: SocialFormState) => void;
}

export default function SocialsTableBody({
  socials,
  isLoading,
  userId,
  onUpdated,
  onDeleted,
}: SocialsTableBodyProps) {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            Loading...
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (socials.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
            No social links yet. Click &ldquo;Add Social&rdquo; to get started.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {socials.map((social) => (
        <SocialsTableRow
          key={social.id}
          social={social}
          userId={userId}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ))}
    </TableBody>
  );
}