"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import Badge from "@/components/ui/badge/Badge";
import ComponentCard from "@/components/common/ComponentCard";
import SocialFormModal from "./_components/SocialFormModal";
import DeleteSocialModal from "./_components/DeleteSocialModal";

type Social = {
  id: number;
  name: string;
  link: string | null;
  desc: string | null;
  portfolioId: number;
};

// Hard-coded portfolioId=1 for now; replace with session-based id when ready
const PORTFOLIO_ID = 1;

export default function SocialsPage() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSocials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/socials?portfolioId=${PORTFOLIO_ID}`);
      if (!res.ok) throw new Error("Failed to load socials");
      const data = await res.json();
      setSocials(data);
    } catch {
      setError("Could not load social links. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocials();
  }, [fetchSocials]);

  return (
    <div className="space-y-5 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Social Links
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your portfolio social media links.
          </p>
        </div>
        <SocialFormModal
          portfolioId={PORTFOLIO_ID}
          onDone={fetchSocials}
          trigger={
            <Button size="sm">
              + Add Social
            </Button>
          }
        />
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="error" title="Error" message={error} />
      )}

      {/* Table */}
      <ComponentCard title="All Social Links">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-800">
                <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Platform
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Link
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Description
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400" colSpan={4}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : socials.length === 0 ? (
                <TableRow>
                  <TableCell className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
                    No social links yet. Click &ldquo;Add Social&rdquo; to get started.
                  </TableCell>
                </TableRow>
              ) : (
                socials.map((social) => (
                  <TableRow
                    key={social.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="px-4 py-3">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {social.name}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {social.link ? (
                        <a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-500 hover:underline text-sm truncate max-w-xs block"
                        >
                          {social.link}
                        </a>
                      ) : (
                        <Badge color="warning" size="sm">No URL</Badge>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {social.desc || "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <SocialFormModal
                          portfolioId={PORTFOLIO_ID}
                          social={social}
                          onDone={fetchSocials}
                          trigger={
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          }
                        />
                        <DeleteSocialModal
                          socialId={social.id}
                          socialName={social.name}
                          onDone={fetchSocials}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ComponentCard>
    </div>
  );
}
