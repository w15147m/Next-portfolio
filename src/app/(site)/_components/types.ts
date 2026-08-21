// ─── Types ────────────────────────────────────────────────────────────────────
export interface PortfolioUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  address: string | null;
  number: string | null;
  desc: string | null;
  skills: { id: number; name: string; proficiency: string | null; desc: string | null }[];
  experiences: {
    id: number;
    company: string;
    position: string;
    image: string | null;
    startDate: string;
    endDate: string | null;
    desc: string | null;
  }[];
  educations: {
    id: number;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string | null;
    desc: string | null;
  }[];
  services: { id: number; name: string; desc: string | null; link: string | null }[];
  socials: { id: number; name: string; link: string | null; desc: string | null }[];

  projects: { id: number; name: string; desc: string | null; image: string | null; skills: string[]; images: string[] }[];
}
