import { ArchdeaconryResults } from "../models/archdeaconry";
import { CongregationResults } from "../models/congregation";
import { ParishResults } from "../models/parish";
import { DetailsListItem } from "../models/shared";
import { EventResults } from '../models/event';
import { peoplesNames } from "./eventHelper";
import { formattedDate } from "./miscellaneous";
import { TransactionResults } from "../models/transaction";
import { describeTransaction } from "./transactionHelper";

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
        displayText: `${formattedDate(event)}: ${event.eventType} of ${peoplesNames(event)}`,
    }));
}

export function transactionItems(transactionResults: TransactionResults): DetailsListItem[] {
    return transactionResults.transactions.map(transaction => ({
        id: transaction.id,
        displayText: `${formattedDate(transaction)} : ${describeTransaction(transaction)}`,
    }));
}