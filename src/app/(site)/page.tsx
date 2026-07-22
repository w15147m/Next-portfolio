import type { Metadata } from "next";
import PortfolioPage from "./_components/PortfolioPage";
import BackToTop from "@/components/common/BackToTop";


export default function SitePage() {
  return <>
    <PortfolioPage />
    <BackToTop />
  </>
}