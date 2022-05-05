import { Loan } from "../../models/sacco/loan";

export function describeLoan(loan: Loan) {
    return `${loan.loanType} Loan`;
}

export function describeLoanTerm(loan: Loan) {
    return `${loan.termMonths} months`;`
}