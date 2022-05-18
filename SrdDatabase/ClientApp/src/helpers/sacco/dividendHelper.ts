import { Dividend } from "../../models/sacco/dividend";

export function describeDividend(dividend: Dividend) {
    return `Dividend of ${dividend.percentage}%`;
}