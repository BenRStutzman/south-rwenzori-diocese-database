import { Distribution, DistributionApplied } from "../../models/sacco/distribution";

export function describeDistribution(distribution: Distribution) {
    return `${distribution.dividendPercentage}% dividend and ${distribution.interestPercentage}% interest`;
}

export function describeDistributionApplied(distributionApplied: DistributionApplied) {
    return `${distributionApplied.dividend?.toLocaleString()} UGX dividend and ${distributionApplied.interest?.toLocaleString()} UGX interest`;
}