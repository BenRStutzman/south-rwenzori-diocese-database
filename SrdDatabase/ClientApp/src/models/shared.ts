export interface PagedResults {
    pageNumber: number;
    pageSize: number;
    totalResults: number;
}

export interface PagedParameters {
    pageNumber: number;
}

export const pagedResultsDefaults = {
    pageNumber: 0,
    pageSize: 0,
    totalResults: 0,
};

export interface DetailsListItem {
    id?: number;
    displayText?: string;
    altKey?: string;
    altType?: string;
    dateTime?: number;
}