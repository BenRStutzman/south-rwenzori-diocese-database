import { User } from "../store/login";

export function get<TResponse>(url: string): Promise<TResponse> {
    const token = getToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
        }
    }

    return fetch(url, requestOptions)
        .then(response => response.json() as Promise<TResponse>);
};

export function post<TRequest>(url: string, data: TRequest): Promise<Response> {
    const token = getToken();

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions);
};

export interface Errors {
    [fieldName: string]: string[];
}

export interface ErrorResponse {
    errors: Errors
};

function getToken() {
    const userJson = localStorage.getItem('user');
    const user = userJson ? (JSON.parse(userJson) as User) : undefined;
    return user ? user.token : undefined;
};
