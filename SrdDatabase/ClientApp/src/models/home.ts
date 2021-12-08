import { Archdeaconry } from "./archdeaconry";
import { Congregation } from "./congregation";
import { Parish } from "./parish";
import { Event } from './event';

export interface Details {
    archdeaconries: Archdeaconry[];
    parishes: Parish[];
    congregations: Congregation[];
    recentEvents: Event[];
}