import { Payment } from '../models/payment';

export function describePayment(payment: Payment, useAmount: boolean = false) {
    return useAmount
        ? `Payment of ${payment.amount} UGX`
        : `Payment from ${payment.congregation} Congregation`;
}