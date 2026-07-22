import { nameSchema, descSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const projectSchema = z.object({
  name: nameSchema,
  desc: descSchema,
  image: z.string().optional().or(z.literal("")),
});

export type ProjectFieldErrors = {
  name?: string[];
  desc?: string[];
  image?: string[];
};

export type Project = {
  id: number;
  name: string;
  desc: string | null;
  image: string | null;
  userId: string;
};

export type ProjectFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ProjectFieldErrors;
  data?: Project;
};
