import { z } from 'zod';

export const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ID'),
    category: z.string().min(1, 'Category is required'),
    content: z.string().optional(),
    isPremium: z.boolean().default(false),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    isPremium: z.boolean().optional(),
    imageUrl: z.string().optional(),
    content: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const postValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
