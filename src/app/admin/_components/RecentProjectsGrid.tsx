import React from 'react';
import Link from 'next/link';


interface Project {
  id: number;
  name: string;
  desc: string | null;
  image: string | null;
  skills: string[];
  createdAt: string;
}

export default function RecentProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-8 text-center text-gray-500">
        No projects found. Add one to see it here!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="group relative rounded-2xl border border-neutral-800 bg-[#0a0a0a] overflow-hidden hover:border-brand-500/50 transition-colors">
          <div className="aspect-video w-full bg-neutral-900 relative overflow-hidden">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-white truncate pr-4">{project.name}</h3>
              <span className="text-xs text-neutral-500 whitespace-nowrap">
                {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            {project.desc && (
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {project.desc}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.skills.slice(0, 3).map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-400">
                  +{project.skills.length - 3}
                </span>
              )}
            </div>
          </div>
          <Link href={`/admin/projects`} className="absolute inset-0 z-10">
            <span className="sr-only">View {project.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
