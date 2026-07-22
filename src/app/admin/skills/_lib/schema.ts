import { descSchema, nameSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const skillSchema = z.object({
   proficiency: z
    .number()
    .min(0, "Proficiency can't be negative")
    .max(100, "Proficiency can't exceed 100"),
  name: nameSchema,
  desc: descSchema,
});

export type SocialFieldErrors = {
  name?: string[];
  proficiency?: string[];
  desc?: string[];
};


export type skill = {
  id: number;
  name: string;
  proficiency: string | null;
  desc: string | null;
  userId: string;
};

export type SocialFormState = {
  success: boolean;
  message: string;
  fieldErrors?: SocialFieldErrors;
  data?: skill;
};
