"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import EducationsTableHeader from "./components/EducationsTableHeader";
import EducationsTableBody from "./components/EducationsTableBody/EducationsTableBody";
import { useEducations } from "../../_lib/useEducations";
import Loading from "@/components/ui/loaders/Loading";

interface EducationsTableProps {
  userId: string;
}

export default function EducationsTable({ userId }: EducationsTableProps) {
  const { educations, isLoading, isError } = useEducations(userId);
  const headers = ["No", "Institution", "Degree", "Field of Study", "Duration", "Description", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <EducationsTableHeader headers={headers} />
            <EducationsTableBody userId={userId} educations={educations} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
