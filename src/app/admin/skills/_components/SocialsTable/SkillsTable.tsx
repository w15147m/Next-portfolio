"use client";

import React from "react";
import { Table } from "@/components/ui/table";

import Loading from "@/components/ui/loaders/Loading";
import { useSkills } from "../../_lib/useSkills";
import SkillsTableHeader from "./component/SkillsTableHeader";

interface SocialsTableProps {
  userId: string;
}

export default function SkillsTable({ userId }: SocialsTableProps) { 
  const { skills, isLoading, isError } = useSkills(userId);

  const headers = ['Icon', ' name', 'proficiency', 'Description', 'Action']

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
            <Table>
              <SkillsTableHeader headers={headers} />
          </Table>
        </div>
      )}
    </>
  );
}