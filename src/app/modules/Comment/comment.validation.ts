import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Comment is required',
    }),

    post: z.string({
      required_error: 'Post is required',
    }),

    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const commentValidation = {
  createCommentValidationSchema,
};
