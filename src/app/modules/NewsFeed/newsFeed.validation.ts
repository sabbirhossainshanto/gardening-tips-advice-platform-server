import { z } from 'zod';

const createNewsFeed = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const newsFeedValidation = {
  createNewsFeed,
};
