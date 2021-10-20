export interface Errors {
    [fieldName: string]: string[];
}

export interface ErrorResponse {
    errors: Errors
};