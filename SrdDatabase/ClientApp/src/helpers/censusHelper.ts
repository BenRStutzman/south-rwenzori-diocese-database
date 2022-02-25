import { Census } from '../models/census';
import { CurrentUser } from '../models/user';
import { atLeast } from './userHelper';

export function describeCensus(census: Census, useCount: boolean = false) {
    return useCount
        ? `${census.numberOfChristians} Christians`
        : `Census at ${census.congregation} Congregation`;
}

export function canEdit(census: Census, currentUser: CurrentUser | undefined) {
    return currentUser &&
        (atLeast.editor.includes(currentUser.userType) ||
            (atLeast.contributor.includes(currentUser.userType)
                && currentUser.id === census.createdBy))
}

export function stringNumberOfChristians(numberOfChristians?: number) {
    return numberOfChristians?.toString() ?? 'Not counted';
}