export interface PostResponse {
    succeeded: boolean;
    errorMessage: string;
}

export interface DeleteResponse extends PostResponse { };

export interface SaveResponse extends PostResponse {
    id: number;
}