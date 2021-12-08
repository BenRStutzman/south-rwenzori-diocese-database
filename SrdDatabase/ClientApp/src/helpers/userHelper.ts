import { CurrentUser, UserData } from "../models/user";

export const userRole = {
    viewer: 'Viewer',
    contributor: 'Contributor',
    editor: 'Editor',
    administrator: 'Administrator',
}

export const atLeast = {
    viewer: [userRole.viewer, userRole.contributor, userRole.editor, userRole.administrator],
    contributor: [userRole.contributor, userRole.editor, userRole.administrator],
    editor: [userRole.editor, userRole.administrator],
    administrator: [userRole.administrator],
}

export function getUser(): CurrentUser | undefined {
    const userJson = localStorage.getItem('userData');
    return userJson ? (JSON.parse(userJson) as UserData).user : undefined;
}