import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/parish/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Parish } from '../../store/parish';
import { Event } from '../../store/event';
import { Congregation } from '../../store/congregation';

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps<{ parishId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
}: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadDetails(parishId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{(details.parish as Parish).name} Parish</h1>
            <Link className="btn btn-primary float-right" to={`/parish/edit/${(details.parish as Parish).id}`}>
                Edit parish
            </Link>
            <h2>Archdeaconry: {(details.parish as Parish).archdeaconry}</h2>
            <h2>Congregations ({(details.congregations as Congregation[]).length})</h2>
            <ul>
                {(details.congregations as Congregation[]).map(congregation =>
                    <li key={congregation.id}>{congregation.name}</li>
                )}
            </ul>
            <h2>Recent Events</h2>
            <ul>
                {(details.recentEvents as Event[]).map(event =>
                    <li key={event.id}>{new Date(event.date as Date).toLocaleDateString('en-ca')}: {event.eventType} of {event.firstPersonName}{event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at {event.congregation} Congregation</li>
                )}
            </ul>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.parish.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);