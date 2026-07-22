import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(60),
    startYear: z.string().regex(/^\d{4}$/),
    endYear: z.string().regex(/^\d{4}$/).optional(),
    url: z.string().url(),
    tags: z.array(z.string()).max(8),
  }),
});

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string().max(60),
    role: z.string().max(60),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
  }),
});

export const collections = { projects, experience };
