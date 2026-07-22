"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import ProjectsTableHeader from "./components/ProjectsTableHeader";
import ProjectsTableBody from "./components/ProjectsTableBody/ProjectsTableBody";
import { useProjects } from "../../_lib/useProjects";
import Loading from "@/components/ui/loaders/Loading";

interface ProjectsTableProps {
  userId: string;
}

export default function ProjectsTable({ userId }: ProjectsTableProps) {
  const { projects, isLoading, isError } = useProjects(userId);
  const headers = ["Icon", "Project Name", "Skills", "Description", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <ProjectsTableHeader headers={headers} />
            <ProjectsTableBody userId={userId} projects={projects} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
