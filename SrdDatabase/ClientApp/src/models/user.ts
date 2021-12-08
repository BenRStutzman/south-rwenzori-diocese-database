import { PagedResults } from "./shared";

export interface User {
    id?: number;
    name?: string;
    userType?: string;
    userTypeId?: number;
    username?: string;
    password?: string;
}

export interface UserType {
    id: number;
    name: string;
}

export interface UserData {
    user: CurrentUser;
    token: String;
}

export interface CurrentUser {
    id: number;
    name: string;
    username: string;
    userTypeId: number;
    userType: string;
}

export interface Details {
    user: User;
}

export interface Parameters {
    name?: string;
    username?: string;
    userTypeId?: number;
}

export interface Results extends PagedResults {
    users: User[];
}