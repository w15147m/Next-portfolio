export default function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-14">
      <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-500 mb-3 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">{subtitle}</p>}
    </div>
  );
}
