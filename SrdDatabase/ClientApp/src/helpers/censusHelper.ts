import { Census } from '../models/census';
import { CurrentUser } from '../models/user';
import { atLeast } from './userHelper';

export function canEdit(census: Census, currentUser: CurrentUser | undefined) {
    return currentUser &&
        (atLeast.editor.includes(currentUser.userType) ||
            (atLeast.contributor.includes(currentUser.userType)
                && currentUser.id === census.createdBy))
}