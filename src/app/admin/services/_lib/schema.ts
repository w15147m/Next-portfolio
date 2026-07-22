import { descSchema, linkSchema, nameSchema } from "@/lib/schema/zodSchema";
import { z } from "zod";

export const serviceSchema = z.object({
  name: nameSchema,
  desc: descSchema,
  link: linkSchema,
});

export type ServiceFieldErrors = {
  name?: string[];
  link?: string[];
  desc?: string[];
};

export type Service = {
  id: number;
  name: string;
  link: string | null;
  desc: string | null;
  userId: string;
};

export type ServiceFormState = {
  success: boolean;
  message: string;
  fieldErrors?: ServiceFieldErrors;
  data?: Service;
};
