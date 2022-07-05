import { CurrentUser, UserData, userRole } from "../models/user";

export const atLeast = {
    basic: [userRole.basic, userRole.viewer, userRole.contributor, userRole.accountant, userRole.editor, userRole.sacco, userRole.administrator],
    viewer: [userRole.viewer, userRole.accountant, userRole.editor, userRole.administrator],
    contributor: [userRole.contributor, userRole.editor, userRole.administrator],
    accountant: [userRole.accountant, userRole.editor, userRole.administrator],
    editor: [userRole.editor, userRole.administrator],
    sacco: [userRole.sacco, userRole.administrator],
    administrator: [userRole.administrator],
}

export function getUser(): CurrentUser | undefined {
    const userJson = localStorage.getItem('userData');
    return userJson ? (JSON.parse(userJson) as UserData).user : undefined;
}