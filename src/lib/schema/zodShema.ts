import { z } from "zod";

export const nameSchema = z.string().min(1, "Name is required").max(100, "Name is too long");

export const descSchema = z.string().max(255, "Description is too long").optional().or(z.literal(""));