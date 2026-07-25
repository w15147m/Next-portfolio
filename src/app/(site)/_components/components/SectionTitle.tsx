export default function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase text-[#64ffda] mb-3 px-3 py-1 rounded-full bg-[#64ffda]/10 border border-[#64ffda]/20">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#ccd6f6]">{title}</h2>
      {subtitle && <p className="mt-3 text-[#8892b0] max-w-xl mx-auto text-base">{subtitle}</p>}
    </div>
  );
}
