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