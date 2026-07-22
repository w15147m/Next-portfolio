import { z } from "zod";

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution name is required").max(150, "Institution name is too long"),
  degree: z.string().min(1, "Degree is required").max(100, "Degree is too long"),
  fieldOfStudy: z.string().max(100, "Field of study is too long").optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  desc: z.string().max(500, "Description is too long").optional().or(z.literal("")),
});

export type EducationFieldErrors = {
  institution?: string[];
  degree?: string[];
  fieldOfStudy?: string[];
  startDate?: string[];
  endDate?: string[];
  desc?: string[];
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  startDate: Date | string;
  endDate: Date | string | null;
  desc: string | null;
  userId: string;
};

export type EducationFormState = {
  success: boolean;
  message: string;
  fieldErrors?: EducationFieldErrors;
  data?: Education;
};
