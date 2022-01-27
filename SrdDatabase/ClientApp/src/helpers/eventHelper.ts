import { Event } from '../models/event';
import { CurrentUser } from '../models/user';
import { atLeast } from './userHelper';
    
export function peoplesNames(event: Event): string {
    return `${event.firstPersonName}${event.secondPersonName ? ` and ${event.secondPersonName}` : '' }`
};

export function canEdit(event: Event, currentUser: CurrentUser | undefined) {
    return currentUser &&
        (atLeast.editor.includes(currentUser.userType) ||
        (atLeast.contributor.includes(currentUser.userType)
            && currentUser.id === event.createdBy))
}