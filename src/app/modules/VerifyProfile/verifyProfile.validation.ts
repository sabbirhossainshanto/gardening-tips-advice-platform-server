import { z } from 'zod';

export const createVerifyProfileValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'user is required!',
      message: 'user should be in string!',
    }),
    date: z.string({
      required_error: 'date is required!',
      message: 'date should be in string!',
    }),
    amount: z.number({
      required_error: 'amount is required!',
      message: 'amount should be in number!',
    }),

    isDeleted: z
      .boolean({
        required_error: 'isDeleted  is required!',
        message: 'isDeleted  should be in boolean!',
      })
      .default(false)
      .optional(),
    isPaid: z.boolean().default(false).optional(),
    transactionId: z.string().optional(),
  }),
});
