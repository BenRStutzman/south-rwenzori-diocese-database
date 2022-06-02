import { Installment } from "../../models/sacco/installment";

export function describeInstallment(installment: Installment) {
    return `Installment #${installment.installmentNumber}`;
}