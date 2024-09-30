import { z } from 'zod';

export const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID'),
    imageUrls: z
      .array(z.string().url())
      .min(1, 'At least one image URL is required'),
    category: z.string().min(1, 'Category is required'),
    tags: z.array(z.string()).optional(),
    isPremium: z.boolean().optional().default(false),
    upvotes: z.number().nonnegative().optional().default(0),
    downvotes: z.number().nonnegative().optional().default(0),

  }),
});

export const postValidation = {
  createPostValidationSchema,
};
