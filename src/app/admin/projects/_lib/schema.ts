import { nameSchema, descSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const projectSchema = z.object({
  name: nameSchema,
  desc: descSchema,
  image: z.string().optional().or(z.literal("")),
  skillIds: z.array(z.number()).optional(),
});

export type ProjectFieldErrors = {
  name?: string[];
  desc?: string[];
  image?: string[];
  skillIds?: string[];
};

export type ProjectSkillItem = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  desc: string | null;
  image: string | null;
  userId: string;
  skills?: ProjectSkillItem[];
  skillIds?: number[];
};

export type ProjectFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ProjectFieldErrors;
  data?: Project;
};
