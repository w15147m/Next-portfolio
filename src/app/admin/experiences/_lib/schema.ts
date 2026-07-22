import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required").max(150, "Company name is too long"),
  position: z.string().min(1, "Position is required").max(100, "Position is too long"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  desc: z.string().max(500, "Description is too long").optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
});

export type ExperienceFieldErrors = {
  company?: string[];
  position?: string[];
  startDate?: string[];
  endDate?: string[];
  desc?: string[];
  image?: string[];
};

export type Experience = {
  id: number;
  company: string;
  position: string;
  image: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  desc: string | null;
  userId: string;
};

export type ExperienceFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ExperienceFieldErrors;
  data?: Experience;
};
