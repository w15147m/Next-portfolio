"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import MessagesTableHeader from "./components/MessagesTableHeader";
import MessagesTableBody from "./components/MessagesTableBody/MessagesTableBody";
import { useMessages } from "../../_lib/useMessages";
import Loading from "@/components/ui/loaders/Loading";

export default function MessagesTable() {
  const { messages, isLoading, isError } = useMessages();
  const headers = ["From", "Email", "Subject", "Message Preview", "Date", "Action"];

  return (
    <>
      {isLoading ? (
        <Loading msg="Loading..." />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <MessagesTableHeader headers={headers} />
            <MessagesTableBody messages={messages} isError={isError} />
          </Table>
        </div>
      )}
    </>
  );
}
