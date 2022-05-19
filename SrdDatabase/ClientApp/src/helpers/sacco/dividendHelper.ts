import { Dividend, DividendApplied } from "../../models/sacco/dividend";

export function describeDividend(dividend: Dividend) {
    return `Dividend of ${dividend.percentage}%`;
}

export function describeDividendApplied(dividendApplied: DividendApplied) {
    return `Dividend of ${dividendApplied.amount} UGX (${dividendApplied.percentage}%)}`;
}