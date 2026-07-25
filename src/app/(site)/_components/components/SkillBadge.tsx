import SkillIcon from "@/components/ui/SkillIcon";

export default function SkillBadge({ name, proficiency }: { name: string; proficiency?: string | null }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#233554] bg-[#112240] text-sm font-mono text-[#a8b2d1] hover:border-[#64ffda] hover:text-[#64ffda] transition-colors group">
      <SkillIcon icon={name} size={40} />
      <span>{name}</span>
      {proficiency && (
        <span className="text-xs text-[#8892b0] group-hover:text-[#64ffda] transition-colors">
          · {proficiency}
        </span>
      )}
    </div>
  );
}
