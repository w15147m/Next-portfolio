import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import type { PortfolioUser } from "../types";

export default function ProjectsSection({ projects }: { projects: PortfolioUser["projects"] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="Portfolio"
          title="Featured Projects"
          subtitle="A selection of work that demonstrates my capabilities and problem-solving approach."
        />
        <div className="flex flex-wrap gap-6 justify-center">
          {projects.map((proj) => (
    <div key={proj.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
      <ProjectCard project={proj} />
    </div>
  ))}
        </div>


      </div>
    </section>
  );
}
