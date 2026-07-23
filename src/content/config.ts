import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(60),
    startYear: z.string().regex(/^\d{4}$/),
    endYear: z
      .string()
      .regex(/^\d{4}$/)
      .or(z.literal("Present"))
      .optional(),
    url: z.string().url(),
    tags: z.array(z.string()).max(8),
  }),
});

const months = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const datePattern = new RegExp(`^${months}\\s\\d{4}$`);

const experience = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string().max(60),
    role: z.string().max(60),
    startDate: z.string().regex(datePattern),
    endDate: z.string().regex(datePattern).or(z.literal("Present")),
    location: z.string(),
  }),
});

export const collections = { projects, experience };
