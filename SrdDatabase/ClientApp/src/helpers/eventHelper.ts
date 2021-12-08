import { Event } from '../models/event';
    
export function peoplesNames(event: Event): string {
    return `${event.firstPersonName}${event.secondPersonName ? ` and ${event.secondPersonName}` : '' }`
};

export function formattedDate(event: Event): string {
    return event.date ? new Date(event.date).toLocaleDateString('en-ca') : ''
}