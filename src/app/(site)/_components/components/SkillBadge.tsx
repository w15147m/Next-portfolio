import SkillIcon from "@/components/ui/SkillIcon";

export default function SkillBadge({
  name,
  proficiency,
}: {
  name: string;
  proficiency?: string | null;
}) {
  return (
    <div className="group flex items-center gap-2.5 px-4 py-2 rounded border border-[#233554] bg-[#112240] font-mono text-sm text-[#a8b2d1] transition-all duration-200 hover:border-[#64ffda] hover:text-[#64ffda] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(100,255,218,0.08)]">
      {/* Teal arrow matching v4-main list style */}
      <span className="text-[#64ffda] text-xs flex-shrink-0">▹</span>

      {/* Icon */}
      <SkillIcon icon={name} size={18} />

      {/* Name */}
      <span>{name}</span>

      {/* Optional proficiency */}
      {proficiency && (
        <span className="text-[10px] text-[#8892b0] group-hover:text-[#64ffda]/60 transition-colors ml-0.5">
          · {proficiency}
        </span>
      )}
    </div>
  );
}
