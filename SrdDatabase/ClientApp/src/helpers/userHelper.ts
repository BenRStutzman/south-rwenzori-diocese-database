import { UserData } from "../store/login";
import { User } from "../store/user";

export function getUser(): User | undefined {
    const userJson = localStorage.getItem('userData');
    return userJson ? (JSON.parse(userJson) as UserData).user : undefined;
}