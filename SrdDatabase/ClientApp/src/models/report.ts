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
