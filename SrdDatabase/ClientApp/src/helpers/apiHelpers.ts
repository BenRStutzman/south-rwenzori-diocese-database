import { UserData } from "../models/user";

export function get<TResponse>(url: string, backupUrl?: string): Promise<TResponse> {
    const token = getToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
        }
    }

    return fetch(url, requestOptions)
        .then(response => {
            redirectIfUnauthorized(response);
            redirectIfServerError(response, backupUrl);
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
            redirectIfUnauthorized(response);
            return response;
        });
};

export function getCsv(url: string, data: any): Promise<string> {
    return post<string>('/api/congregation/report', data)
        .then(response => response.text());
};

export interface Errors {
    [fieldName: string]: string[];
}

export interface ErrorResponse {
    errors: Errors
};

function redirectIfServerError(response: Response, backupUrl?: string) {
    if (response.status === 500 && backupUrl) {
        window.location.replace(backupUrl);
    }
}

function redirectIfUnauthorized(response: Response) {
    if (response.status === 401) {
        const redirectionPath =
            localStorage.getItem('userData') && window.location.pathname != '/'
                ? '/'
                : '/login';
        window.location.replace(redirectionPath);
    }
}

function getToken() {
    const userJson = localStorage.getItem('userData');
    const userData = userJson ? (JSON.parse(userJson) as UserData) : undefined;
    return userData ? userData.token : undefined;
};
