export function get<TResponse>(url: string): Promise<TResponse> {
    return fetch(url)
        .then(response => response.json() as Promise<TResponse>);
}

export function post<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions)
        .then(response => response.json() as Promise<TResponse>);
}
