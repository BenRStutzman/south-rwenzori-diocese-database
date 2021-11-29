import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/congregation/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Event } from '../../store/event';
import { Congregation } from '../../store/congregation';

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps<{ congregationId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadDetails(congregationId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{(details.congregation as Congregation).name} Congregation</h1>
            <Link className="btn btn-primary float-right" to={`/congregation/edit/${(details.congregation as Congregation).id}`}>
                Edit congregation
            </Link>
            <h2>Parish: {(details.congregation as Congregation).parish}</h2>
            <h2>Archdeaconry: {(details.congregation as Congregation).archdeaconry}</h2>
            <h2>Recent Events</h2>
            <ul>
                {(details.recentEvents as Event[]).map(event =>
                    <li key={event.id}>{new Date(event.date).toLocaleDateString('en-ca')}: {event.eventType} of {event.firstPersonName}{event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at {event.congregation} Congregation</li>
                )}
            </ul>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.congregation.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);