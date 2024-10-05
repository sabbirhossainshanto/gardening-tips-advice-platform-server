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

export const gardenJournalValidation = {
  createGardenJournalValidationSchema,
};
