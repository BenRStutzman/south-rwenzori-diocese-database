import { Distribution, DistributionApplied } from "../../models/sacco/distribution";

export function describeDistribution(distribution: Distribution) {
    return `${distribution.dividendPercentage}% dividend and ${distribution.interestPercentage}% interest`;
}

export function describeDistributionApplied(distributionApplied: DistributionApplied) {
    return `${distributionApplied.dividendPercentage}% dividend --> ${distributionApplied.dividend?.toLocaleString()} UGX and ${distributionApplied.interestPercentage}% interest --> ${distributionApplied.interest?.toLocaleString()} UGX`;
}