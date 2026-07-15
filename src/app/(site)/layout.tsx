import SiteHeader from "@/layout/site/SiteHeader";
import React from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out `}
      >

      <SiteHeader />
      {children}
      </div>
    </div>
  );
}
