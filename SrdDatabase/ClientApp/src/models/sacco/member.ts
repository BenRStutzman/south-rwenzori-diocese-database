import { PagedParameters, PagedResults } from "../shared";

export interface Member {
    id?: number;
    name?: string;
}

export interface MemberDetails {
    member: Member;
}

export interface MemberParameters extends PagedParameters {
    name?: string;
}

export interface MemberResults extends PagedResults {
    members: Member[];
}