"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import ExperiencesTableHeader from "./components/ExperiencesTableHeader";
import ExperiencesTableBody from "./components/ExperiencesTableBody/ExperiencesTableBody";
import { useExperiences } from "../../_lib/useExperiences";
import Loading from "@/components/ui/loaders/Loading";

interface ExperiencesTableProps {
  userId: string;
}

export default function ExperiencesTable({ userId }: ExperiencesTableProps) {
  const { experiences, isLoading, isError } = useExperiences(userId);
  const headers = ["Icon", "Company", "Position", "Duration", "Description", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <ExperiencesTableHeader headers={headers} />
            <ExperiencesTableBody userId={userId} experiences={experiences} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
