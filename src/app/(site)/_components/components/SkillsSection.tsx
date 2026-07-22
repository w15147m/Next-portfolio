import SkillBadge from "./SkillBadge";
import SectionTitle from "./SectionTitle";
import type { PortfolioUser } from "../types";

export default function SkillsSection({ skills }: { skills: PortfolioUser["skills"] }) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="Technical Expertise"
          title="Skills & Technologies"
          subtitle="A curated set of tools and technologies I work with professionally."
        />
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.map((skill) => (
            <SkillBadge key={skill.id} name={skill.name} proficiency={skill.proficiency} />
          ))}
        </div>
      </div>
    </section>
  );
}
