import { PagedParameters, PagedResults } from "../shared";

export interface DividendType {
    id?: number;
    name: string;
}

export interface Dividend {
    id?: number;
    date?: Date;
    percentage?: number;
}

export interface DividendToSend extends Omit<Dividend, "date"> {
    date?: string;
}

export interface DividendDetails {
    dividend: Dividend;
}

export interface DividendParameters extends PagedParameters {
    startDate?: Date;
    endDate?: Date;
}

export interface DividendParametersToSend extends Omit<DividendParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface DividendResults extends PagedResults {
    dividends: Dividend[];
}