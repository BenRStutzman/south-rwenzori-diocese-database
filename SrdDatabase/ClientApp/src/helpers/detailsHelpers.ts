import { ArchdeaconryResults } from "../models/archdeaconry";
import { CongregationResults } from "../models/congregation";
import { ParishResults } from "../models/parish";
import { DetailsListItem, Population } from "../models/shared";
import { EventResults } from '../models/event';
import { describeEvent } from "./eventHelper";
import { formattedDate } from "./miscellaneous";
import { PaymentResults } from "../models/payment";
import { CensusResults } from "../models/census";
import { describeCensus } from "./censusHelper";
import { QuotaResults } from "../models/quota";
import { describeQuota, formattedDates } from "./quotaHelper";
import { describePayment } from "./paymentHelper";

export function archdeaconryItems(archdeaconryResults: ArchdeaconryResults): DetailsListItem[] {
    return archdeaconryResults.archdeaconries.map(archdeaconry => (
        { id: archdeaconry.id, displayText: archdeaconry.name }
    ));
}

export function parishItems(parishResults: ParishResults): DetailsListItem[] {
    return parishResults.parishes.map(parish => (
        { id: parish.id, displayText: parish.name }
    ));
}

export function congregationItems(congregationResults: CongregationResults): DetailsListItem[] {
    return congregationResults.congregations.map(congregation => (
        { id: congregation.id, displayText: congregation.name }
    ));
}

export function eventItems(eventResults: EventResults): DetailsListItem[] {
    return eventResults.events.map(event => ({
        id: event.id,
        displayText: `${formattedDate(event.date)}: ${describeEvent(event)}`,
    }));
}

export function censusItems(censusResults: CensusResults, useCount: boolean = false): DetailsListItem[] {
    return censusResults.censuses.map(census => ({
        id: census.id,
        displayText: `${formattedDate(census.date)}: ${describeCensus(census, useCount)}`,
    }));
}

export function paymentItems(paymentResults: PaymentResults, useAmount: boolean = false): DetailsListItem[] {
    return paymentResults.payments.map(payment => ({
        id: payment.id,
        displayText: `${formattedDate(payment.date)}: ${describePayment(payment, useAmount)}`,
    }));
}

export function quotaItems(quotaResults: QuotaResults, useAmount: boolean = false): DetailsListItem[] {
    return quotaResults.quotas.map(quota => ({
        id: quota.id,
        displayText: `${formattedDates(quota)}: ${describeQuota(quota, useAmount)}`,
    }));
}

export function populationItems(population: Population): DetailsListItem[] {
    if (population.males0To12 === undefined || population.males0To12 === null) {
        return [];
    }

    var males = (population.males0To12 as number) + (population.males13To17 as number)
        + (population.males18To35 as number) + (population.males36AndAbove as number);

    var females = (population.females0To12 as number) + (population.females13To17 as number)
        + (population.females18To35 as number) + (population.females36AndAbove as number);

    return [
        {
            id: 1,
            displayText: `Males: ${males.toLocaleString()}`,
        },
        {
            id: 2,
            displayText: `Females: ${females.toLocaleString()}`,
        },
        {
            id: 3,
            displayText: `Males 0-12: ${population.males0To12?.toLocaleString()}`,
        },
        {
            id: 4,
            displayText: `Males 13-17: ${population.males13To17?.toLocaleString()}`,
        },
        {
            id: 5,
            displayText: `Males 18-35: ${population.males18To35?.toLocaleString()}`,
        },
        {
            id: 6,
            displayText: `Males 36+: ${population.males36AndAbove?.toLocaleString()}`,
        },
        {
            id: 7,
            displayText: `Females 0-12: ${population.females0To12?.toLocaleString()}`,
        },
        {
            id: 8,
            displayText: `Females 13-17: ${population.females13To17?.toLocaleString()}`,
        },
        {
            id: 9,
            displayText: `Females 18-35: ${population.females18To35?.toLocaleString()}`,
        },
        {
            id: 10,
            displayText: `Females 36+: ${population.females36AndAbove?.toLocaleString()}`,
        },
    ]
}