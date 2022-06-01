import { Distribution, DistributionApplied } from "../../models/sacco/distribution";

export function describeDistribution(distribution: Distribution) {
    return `Distribution of ${distribution.percentage}%`;
}

export function describeDistributionApplied(distributionApplied: DistributionApplied) {
    return `Distribution of ${distributionApplied.percentage}% --> ${distributionApplied.amount?.toLocaleString()} UGX`;
}