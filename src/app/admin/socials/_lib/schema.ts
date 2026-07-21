import { z } from "zod";

export const socialSchema = z.object({
  name: z.string().min(1, "Platform name is required").max(100, "Name is too long"),
  link: z
    .string()
    .url("Please enter a valid URL (e.g. https://github.com/user)")
    .optional()
    .or(z.literal("")),
  desc: z.string().max(255, "Description is too long").optional().or(z.literal("")),
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
