import { z } from 'zod';

export const createVerifyProfileValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'user is required!',
      message: 'user should be in string!',
    }),

    amount: z.number({
      required_error: 'amount is required!',
      message: 'amount should be in number!',
    }),
  }),
});
