import { Event } from '../models/event';
import { CurrentUser } from '../models/user';
import { atLeast } from './userHelper';
    
export function peoplesNames(event: Event): string {
    return `${event.firstPersonName}${event.secondPersonName ? ` and ${event.secondPersonName}` : '' }`
};

export function formattedDate(event: Event): string {
    return event.date ? new Date(event.date).toLocaleDateString('en-ca') : ''
}

export function canEdit(event: Event, user: CurrentUser | undefined) {
    const canEditAllEvents = user && atLeast.editor.includes(user.userType);
    return canEditAllEvents || (user?.id === event.createdBy)
}