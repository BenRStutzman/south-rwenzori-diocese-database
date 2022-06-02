import { Installment } from "../../models/sacco/installment";

export function describeInstallment(installment: Installment) {
    return `Installment of ${installment.principal?.toLocaleString()} UGX`;
}