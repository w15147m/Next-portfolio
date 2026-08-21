"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import SkillsTableHeader from "./components/SkillsTableHeader";
import SkillsTableBody from "./components/SkillsTableBody/SkillsTableBody";
import { useSkills } from "../../_lib/useSkills";
import Loading from "@/components/ui/loaders/Loading";

interface SkillsTableProps {
  userId: string;
}

export default function SkillsTable({ userId }: SkillsTableProps) {
  const { skills, isLoading, isError } = useSkills(userId);
  const headers = ["Icon", "Skill", "Proficiency", "Description", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <SkillsTableHeader headers={headers} />
            <SkillsTableBody userId={userId} skills={skills} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
