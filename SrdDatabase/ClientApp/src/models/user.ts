import { PagedParameters, PagedResults } from "./shared";

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
    privilegeOrder: number;
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

export interface UserDetails {
    user: User;
}

export interface UserParameters extends PagedParameters  {
    name?: string;
    username?: string;
    userTypeId?: number;
}

export interface UserResults extends PagedResults {
    users: User[];
}

export const userRole = {
    basic: 'Basic',
    viewer: 'Viewer',
    contributor: 'Contributor',
    accountant: 'Accountant',
    editor: 'Editor',
    sacco: 'Sacco',
    administrator: 'Administrator',
};