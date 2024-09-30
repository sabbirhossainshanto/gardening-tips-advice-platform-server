import { z } from 'zod';

export const followValidationSchema = z.object({
  body: z.object({
    followingId: z.string({ required_error: 'followingId is required' }),
  }),
});
