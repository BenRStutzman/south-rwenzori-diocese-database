import { ArchdeaconryResults } from "../models/archdeaconry";
import { CongregationResults } from "../models/congregation";
import { ParishResults } from "../models/parish";
import { DetailsListItem } from "../models/shared";
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
        displayText: `${census.date}: ${describeCensus(census, useCount)}`,
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