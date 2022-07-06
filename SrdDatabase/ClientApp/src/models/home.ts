import { ArchdeaconryResults } from "./archdeaconry";
import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { EventResults } from './event';
import { QuotaResults } from "./quota";
import { PaymentResults } from "./payment";
import { Population } from "./shared";

export interface DioceseDetails {
    archdeaconryResults: ArchdeaconryResults;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    quotaResults: QuotaResults;
    population: Population;
    numberOfChristians?: number;
    quota?: number;
    balance?: number;
}