"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import ServicesTableHeader from "./components/ServicesTableHeader";
import ServicesTableBody from "./components/ServicesTableBody/ServicesTableBody";
import { useServices } from "../../_lib/useServices";
import Loading from "@/components/ui/loaders/Loading";

interface ServicesTableProps {
  userId: string;
}

export default function ServicesTable({ userId }: ServicesTableProps) {
  const { services, isLoading, isError } = useServices(userId);
  const headers = ["Icon", "Service", "Link", "Description", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <ServicesTableHeader headers={headers} />
            <ServicesTableBody userId={userId} services={services} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
