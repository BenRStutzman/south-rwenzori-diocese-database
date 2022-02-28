import { Quota } from '../models/quota';

export function describeQuota(quota: Quota, useAmount: boolean = false) {
    return useAmount
        ? `Quota of ${quota.amountPerYear} UGX per year`
        : `Quota for ${quota.congregation} Congregation`;
}

export const formattedDates = (quota: Quota) =>
    `${quota.startYear}${quota.endYear == quota.startYear ? '' : ` to ${quota.endYear ?? 'present'}`}`;