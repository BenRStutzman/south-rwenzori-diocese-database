import { CurrentUser, UserData } from "../store/user";

export function getUser(): CurrentUser | undefined {
    const userJson = localStorage.getItem('userData');
    return userJson ? (JSON.parse(userJson) as UserData).user : undefined;
}