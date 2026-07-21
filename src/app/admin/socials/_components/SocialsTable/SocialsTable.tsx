"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import SocialsTableHeader from "./components/SocialsTableHeader";
import SocialsTableBody from "./components/SocialsTableBody/SocialsTableBody";
import { useSocials } from "../../_lib/useSocials";
import Loading from "@/components/ui/loaders/Loading";

interface SocialsTableProps {
  userId: string;
}

export default function SocialsTable({ userId }: SocialsTableProps) {
  const { socials, isLoading, isError } = useSocials(userId);

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <SocialsTableHeader />
            <SocialsTableBody userId={userId} socials={socials} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}