'use client'

import ScrollRevealHero from "@/components/ui/ScrollRevealHero";


export default function UploadTestPage() {
  return (
    <div>
      <ScrollRevealHero
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1887&auto=format&fit=crop"
        title={
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            MY BRAND
          </h1>
        }
      >
        <button className="inline-flex items-center gap-2 rounded-full border border-white/70 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-white hover:text-black">
          Subscribe
          <span aria-hidden>→</span>
        </button>

        <div className="max-w-xl space-y-4 text-sm sm:text-base text-white/90">
          <p>
            Join to get access to everything I share here — behind the scenes,
            early drops, and exclusive updates.
          </p>
          <p className="font-semibold uppercase tracking-wide">
            New post every Wednesday
          </p>
          <p className="text-white/70">Membership: $10/month · cancel anytime</p>
        </div>
      </ScrollRevealHero>


    </div>
  );
}