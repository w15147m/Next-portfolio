import SkillIcon from "@/components/ui/SkillIcon";

export default function SkillBadge({ name, proficiency }: { name: string; proficiency?: string | null }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-400 transition-colors group">
      <SkillIcon icon={name} size={40} />
      <span>{name}</span>
      {proficiency && (
        <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-brand-500 transition-colors">
          · {proficiency}
        </span>
      )}
    </div>
  );
}
