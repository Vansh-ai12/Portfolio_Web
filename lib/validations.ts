import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || /^https?:\/\/.+/i.test(value), "Must be a valid URL");

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(20).max(1600),
  techStack: z.array(z.string().min(1)).min(1),
  thumbnail: z.string().optional().or(z.literal("")),
  screenshots: z.array(z.string()).default([]),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  categoryId: z.string().optional().or(z.literal("")),
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  visible: z.boolean().default(true),
  completionDate: z.string().optional().or(z.literal(""))
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(10, "Use at least 10 characters")
});

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(4).max(140),
  message: z.string().min(20).max(2000)
});

export const skillSchema = z.object({
  name: z.string().min(1),
  group: z.string().min(1),
  level: z.coerce.number().min(1).max(100),
  visible: z.boolean().default(true),
  order: z.coerce.number().default(0)
});
