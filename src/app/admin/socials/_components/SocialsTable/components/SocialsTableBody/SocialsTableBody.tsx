"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import SocialsTableRow from "../SocialsTableRow";
import { useSocials } from "@/app/admin/socials/useSocials";

interface SocialsTableBodyProps {
  userId: string;
}

export default function SocialsTableBody({ userId }: SocialsTableBodyProps) {
  const { socials, isLoading, isError } = useSocials(userId);

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

  if (isError) {
    return (
      <TableBody>
        <TableRow>
          <TableCell className="px-4 py-10 text-center text-error-500 dark:text-error-400">
            Could not load social links. Please try again.
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
        />
      ))}
    </TableBody>
  );
}