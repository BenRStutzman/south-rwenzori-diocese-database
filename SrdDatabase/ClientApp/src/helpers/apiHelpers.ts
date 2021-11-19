import { UserData } from "../store/login";

export function get<TResponse>(url: string): Promise<TResponse> {
    const token = getToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
        }
    }

    return fetch(url, requestOptions)
        .then(response => {
            logoutIfUnauthorized(response);
            return response.json() as Promise<TResponse>
        });
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

    return fetch(url, requestOptions)
        .then(response => {
            logoutIfUnauthorized(response);
            return response;
        });
};

export interface Errors {
    [fieldName: string]: string[];
}

export interface ErrorResponse {
    errors: Errors
};

function logoutIfUnauthorized(response: Response) {
    if (response.status === 401) {
        window.location.replace('/login');
    }
}

function getToken() {
    const userJson = localStorage.getItem('userData');
    const userData = userJson ? (JSON.parse(userJson) as UserData) : undefined;
    return userData ? userData.token : undefined;
};
