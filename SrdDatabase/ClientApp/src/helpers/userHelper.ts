import { CurrentUser, UserData, userRole } from "../models/user";

export const atLeast = {
    viewer: [userRole.viewer, userRole.contributor, userRole.accountant, userRole.editor, userRole.administrator],
    contributor: [userRole.contributor, userRole.accountant, userRole.editor, userRole.administrator],
    accountant: [userRole.accountant, userRole.editor, userRole.administrator],
    editor: [userRole.editor, userRole.administrator],
    administrator: [userRole.administrator],
}

export function getUser(): CurrentUser | undefined {
    const userJson = localStorage.getItem('userData');
    return userJson ? (JSON.parse(userJson) as UserData).user : undefined;
}