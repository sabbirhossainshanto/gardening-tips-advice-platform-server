import { z } from 'zod';

const createGardenJournalValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User is required' }),
    title: z.string({ required_error: 'Title is required' }),
    content: z.string({ required_error: 'Content is required' }),
    image: z.string({ required_error: 'Image is required' }),
    isPublic: z.boolean().default(false),
  }),
});
const updateGardenJournalValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    content: z.string({ required_error: 'Content is required' }).optional(),
    image: z.string({ required_error: 'Image is required' }).optional(),
    isPublic: z.boolean().optional(),
  }),
});

export const gardenJournalValidation = {
  createGardenJournalValidationSchema,
  updateGardenJournalValidationSchema,
};
