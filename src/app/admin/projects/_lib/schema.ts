import { nameSchema, descSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const projectSchema = z.object({
  name: nameSchema,
  desc: descSchema,
  image: z.string().optional().or(z.literal("")),
  images: z.array(z.string()).optional(),
  skillIds: z.array(z.number()).optional(),
});

export type ProjectFieldErrors = {
  name?: string[];
  desc?: string[];
  image?: string[];
  images?: string[];
  skillIds?: string[];
};

export type ProjectSkillItem = {
  id: number;
  name: string;
};

export type ProjectImageItem = {
  id: number;
  image: string;
  isDefault: boolean;
};

export type Project = {
  id: number;
  name: string;
  desc: string | null;
  image: string | null;
  userId: string;
  skills?: ProjectSkillItem[];
  skillIds?: number[];
  projectImages?: ProjectImageItem[];
  images?: string[];
};

export type ProjectFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ProjectFieldErrors;
  data?: Project;
};
