import { Payment } from "../../models/sacco/payment";

export function describePayment(payment: Payment, useMember: boolean = false) {
    const amountString = payment.amount?.toLocaleString();

    return `Payment of ${amountString} UGX${useMember ? ` by ${payment.member}` : ''}`;
}