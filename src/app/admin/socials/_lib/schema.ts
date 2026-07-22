import { descSchema, linkSchema, nameSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const socialSchema = z.object({
  name: nameSchema,
  desc: descSchema,
  link: linkSchema,
});

export type SocialFieldErrors = {
  name?: string[];
  link?: string[];
  desc?: string[];
};

export type Social = {
  id: number;
  name: string;
  link: string | null;
  desc: string | null;
  userId: string;
};

export type SocialFormState = {
  success: boolean;
  message: string;
  fieldErrors?: SocialFieldErrors;
  data?: Social;
};
