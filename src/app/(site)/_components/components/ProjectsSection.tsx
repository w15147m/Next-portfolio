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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
