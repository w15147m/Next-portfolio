import { descSchema, nameSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const skillSchema = z.object({
  name: nameSchema,
  proficiency: z
    .string()
    .optional()
    .or(z.literal("")),
  desc: descSchema,
});

export type SkillFieldErrors = {
  name?: string[];
  proficiency?: string[];
  desc?: string[];
};

export type Skill = {
  id: number;
  name: string;
  proficiency: string | null;
  desc: string | null;
  userId: string;
};

export type SkillFormState = {
  success: boolean;
  message: string;
  fieldErrors?: SkillFieldErrors;
  data?: Skill;
};
