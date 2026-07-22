import type { Metadata } from "next";

import { getPortfolioData } from '../lib/portfolio/getPortfolioData';
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
export async function generateMetadata(): Promise<Metadata> {
  const user = await getPortfolioData();

  if (!user) {
    return { title: "Portfolio not found" };
  }

  const description = user.desc || `Portfolio of ${user.name}.`;

  return {
    title: `${user.name} | Portfolio`,
    description,
    openGraph: {
      title: `${user.name} | Portfolio`,
      description,
      images: user.image ? [user.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name} | Portfolio`,
      description,
      images: user.image ? [user.image] : undefined,
    },
  };
}
async function PortfolioPage() {

  const user = await getPortfolioData();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Portfolio not found.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full overflow-hidden bg-gray-50 dark:bg-neutral-950">
      <HeroSection user={user} />
      <SkillsSection skills={user.skills} />
      <ProjectsSection projects={user.projects} />
      <ExperienceSection experiences={user.experiences} />
      {/* <EducationSection educations={user.educations} /> */}
      <ServicesSection services={user.services} />
      <TestimonialsSection testimonials={user.testimonials} />
      <ContactSection user={user} />
      <Footer user={user} />
    </main>
  );
}

export default PortfolioPage