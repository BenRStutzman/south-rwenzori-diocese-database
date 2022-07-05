export interface PagedResults {
    pageNumber: number;
    pageSize: number;
    totalResults: number;
}

export interface PagedParameters {
    pageNumber?: number;
    sortColumn?: string;
    sortDescending?: boolean;
}

export const pagedResultsDefaults = {
    pageNumber: 0,
    pageSize: 0,
    totalResults: 0,
};

export interface DetailsListItem {
    id?: number;
    displayText?: string;
}

export interface Population {
    males0To12?: number;
    females0To12?: number;
    males13To17?: number;
    females13To17?: number;
    males18To35?: number;
    females18To35?: number;
    males36AndAbove?: number;
    females36AndAbove?: number;
}