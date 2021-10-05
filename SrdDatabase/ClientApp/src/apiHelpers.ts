export function get<T>(url: string): Promise<T> {
    return fetch(url)
        .then(response => response.json() as Promise<T>);
}

export function post<T>(url: string, data: object): Promise<T> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(url, requestOptions)
        .then(response => response.json() as Promise<T>);
}
