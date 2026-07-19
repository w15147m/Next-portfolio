"use client";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-neutral-950 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
       
          <Link href="/admin" >
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

       
        <ThemeToggleButton />
        </div>
       
      </div>
    </header>
  );
};

export default SiteHeader;
