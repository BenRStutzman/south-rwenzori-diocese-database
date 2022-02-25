import { Charge } from '../models/charge';

export function describeCharge(charge: Charge, useAmount: boolean = false) {
    return useAmount
        ? `Quota of ${charge.amountPerYear} UGX per year`
        : `Quota for ${charge.congregation} Congregation`;
}

export const formattedDates = (charge: Charge) =>
    `${charge.startYear}${charge.endYear == charge.startYear ? '' : ` to ${charge.endYear ?? 'present'}`}`;