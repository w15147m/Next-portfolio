"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import SocialsTableHeader from "./components/SocialsTableHeader";
import SocialsTableBody from "./components/SocialsTableBody/SocialsTableBody";

interface SocialsTableProps {
  userId: string;
}

export default function SocialsTable({ userId }: SocialsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <SocialsTableHeader />
        <SocialsTableBody userId={userId} />
      </Table>
    </div>
  );
}