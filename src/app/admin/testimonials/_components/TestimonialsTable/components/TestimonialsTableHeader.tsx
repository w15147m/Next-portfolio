import React from "react";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";

interface TestimonialsTableHeaderProps {
  headers: string[];
}

export default function TestimonialsTableHeader({ headers }: TestimonialsTableHeaderProps) {
  const headerCellClass = "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400";
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-200 dark:border-neutral-900">
        {headers.map((header, index, array) => (
          <TableCell
            key={index}
            isHeader
            className={`${headerCellClass} ${index === array.length - 1 ? "text-right" : ""}`}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );
}
