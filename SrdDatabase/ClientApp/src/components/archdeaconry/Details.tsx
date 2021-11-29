import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/archdeaconry/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Archdeaconry } from '../../store/archdeaconry';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Parish } from '../../store/parish';
import { Event } from '../../store/event';
import { Congregation } from '../../store/congregation';

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadDetails(archdeaconryId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{(details.archdeaconry as Archdeaconry).name} Archdeaconry</h1>
            <Link className="btn btn-primary float-right" to={`/archdeaconry/edit/${(details.archdeaconry as Archdeaconry).id}`}>
                Edit archdeaconry
            </Link>
            <h2>Parishes ({(details.parishes as Parish[]).length})</h2>
            <ul>
                {(details.parishes as Parish[]).map(parish =>
                    <li key={parish.id}>{parish.name}</li>
                )}
            </ul>
            <h2>Congregations ({(details.congregations as Congregation[]).length})</h2>
            <ul>
                {(details.congregations as Congregation[]).map(congregation =>
                    <li key={congregation.id}>{congregation.name}</li>
                )}
            </ul>
            <h2>Recent Events</h2>
            <ul>
                {(details.recentEvents as Event[]).map(event =>
                    <li key={event.id}>{new Date(event.date).toLocaleDateString('en-ca')}: {event.eventType} of {event.firstPersonName}{event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at {event.congregation} Congregation</li>
                )}
            </ul>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.archdeaconry.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);