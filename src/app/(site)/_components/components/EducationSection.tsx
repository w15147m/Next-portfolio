import SectionTitle from "./SectionTitle";
import type { PortfolioUser } from "../types";

export default function EducationSection({ educations }: { educations: PortfolioUser["educations"] }) {
  if (educations.length === 0) return null;

  return (
    <section id="education" className="py-24 bg-gray-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle label="Learning" title="Education" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-brand-400 transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{edu.degree}</h3>
              <p className="text-brand-500 text-sm font-semibold mt-1">{edu.institution}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
              </p>
              {edu.desc && <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{edu.desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
