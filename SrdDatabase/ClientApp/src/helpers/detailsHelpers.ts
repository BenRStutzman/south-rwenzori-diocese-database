import { ArchdeaconryResults } from "../models/archdeaconry";
import { CongregationResults } from "../models/congregation";
import { ParishResults } from "../models/parish";
import { DetailsListItem } from "../models/shared";
import { EventResults } from '../models/event';
import { peoplesNames } from "./eventHelper";
import { formattedDate } from "./miscellaneous";
import { PaymentResults } from "../models/payment";
import { ChargeResults } from "../models/charge";

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
        displayText: `${formattedDate(event.date)}: ${event.eventType} of ${peoplesNames(event)}`,
    }));
}

export function paymentItems(paymentResults: PaymentResults): DetailsListItem[] {
    return paymentResults.payments.map(payment => ({
        id: payment.id,
        displayText: `${formattedDate(payment.date)}: Payment of ${payment.amount} UGX`,
        dateTime: new Date(payment.date as Date).getTime()
    }));
}

export function chargeItems(chargeResults: ChargeResults): DetailsListItem[] {
    const currentYear = (new Date()).getFullYear();

    const chargeArrays = chargeResults.charges.map(charge => {
        const yearlyCharges = [];
        const lastYear = charge.endYear ? Math.min(charge.endYear, currentYear) : currentYear;

        if (charge.startYear) {
            for (let year = charge.startYear; year <= lastYear; year++) {
                const date = new Date(year, 0, 1);
                const dateTime = date.getTime();

                yearlyCharges.push({
                    id: charge.id,
                    altKey: `${charge.id}-${year}`,
                    altType: 'charge',
                    displayText: `${formattedDate(date)}: Charge of ${charge.amountPerYear} UGX`,
                    dateTime,
                });
            }
        }

        return yearlyCharges;
    });

    return chargeArrays.reduce((acc, val) => acc.concat(val), []);
}

export function transactionItems(paymentResults: PaymentResults, chargeResults: ChargeResults): DetailsListItem[] {
    return paymentItems(paymentResults)
        .concat(chargeItems(chargeResults))
        .sort((a, b) => (b.dateTime as number) - (a.dateTime as number))
        .slice(0, 10);
}