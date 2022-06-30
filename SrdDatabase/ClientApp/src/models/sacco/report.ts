export interface ReportParameters {
    memberId?: number;
    startDate?: Date;
    endDate?: Date;
};

export interface ReportParametersToSend extends Omit<ReportParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
}
