import { nameSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const testimonialSchema = z.object({
  name: nameSchema,
  role: z.string().max(100, "Role is too long").optional().or(z.literal("")),
  company: z.string().max(100, "Company is too long").optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional().or(z.literal("")),
});

export type TestimonialFieldErrors = {
  name?: string[];
  role?: string[];
  company?: string[];
  content?: string[];
  image?: string[];
};

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  image: string | null;
  userId: string;
};

export type TestimonialFormState = {
  success: boolean;
  message: string;
  fieldErrors?: TestimonialFieldErrors;
  data?: Testimonial;
};
