import type { Metadata } from "next";
import PortfolioPage from "./_components/PortfolioPage";

export const metadata: Metadata = {
  title: "Waseem Abbas | Software Engineer & Full Stack Developer",
  description:
    "Portfolio of Waseem Abbas — Software Engineer specializing in Laravel, Vue, React, React Native, Electron, and modern full-stack development.",
};

export default function SitePage() {
  return <PortfolioPage />;
}