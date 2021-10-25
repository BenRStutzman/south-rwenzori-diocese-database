﻿export function get<TResponse>(url: string): Promise<TResponse> {
    return fetch(url)
        .then(response => response.json() as Promise<TResponse>);
};

export function post<TRequest>(url: string, data: TRequest): Promise<Response> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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