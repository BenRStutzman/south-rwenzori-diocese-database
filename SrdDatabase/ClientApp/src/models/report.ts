export interface Report {
    fileName: string;
    data: string;
};

export interface ReportParameters {
    congregationId?: number;
    parishId?: number;
    archdeaconryId?: number;
    startDate?: Date;
    endDate?: Date;
};

export interface ReportParametersToSend extends Omit<ReportParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
}
