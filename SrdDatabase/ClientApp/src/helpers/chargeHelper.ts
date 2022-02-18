import { Charge } from '../models/charge';

export const combineYears = (charge: Charge) =>
    `${charge.startYear}${charge.endYear == charge.startYear ? '' : ` to ${charge.endYear ?? 'present'}`}`;