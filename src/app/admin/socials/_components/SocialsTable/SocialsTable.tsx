"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import { Social, SocialFormState } from "../../actions";
import SocialsTableHeader from "./components/SocialsTableHeader";
import SocialsTableBody from "./components/SocialsTableBody/SocialsTableBody";

interface SocialsTableProps {
  socials: Social[];
  isLoading: boolean;
  userId: string;
  onUpdated: (social: Social, result: SocialFormState) => void;
  onDeleted: (id: number, result: SocialFormState) => void;
}

export default function SocialsTable({
  socials,
  isLoading,
  userId,
  onUpdated,
  onDeleted,
}: SocialsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <SocialsTableHeader />
        <SocialsTableBody
          socials={socials}
          isLoading={isLoading}
          userId={userId}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      </Table>
    </div>
  );
}