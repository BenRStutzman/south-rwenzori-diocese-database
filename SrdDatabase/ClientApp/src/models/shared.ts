export interface PagedResults {
    pageNumber: number;
    pageSize: number;
    totalResults: number;
}

export const pagedResultsDefaults = {
    pageNumber: 0,
    pageSize: 0,
    totalResults: 0,
};