export type TPayment = {
  transactionId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerMobileNo?: string;
};
