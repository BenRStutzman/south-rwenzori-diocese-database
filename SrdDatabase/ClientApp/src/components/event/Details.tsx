import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Event } from '../../store/event';

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps<{ eventId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
}: Props) => {
    const loadData = () => {
        const eventId = parseInt(match.params.eventId);
        loadDetails(eventId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{(details.event as Event).eventType} Event</h1>
            <Link className="btn btn-primary float-right" to={`/event/edit/${(details.event as Event).id}`}>
                Edit event
            </Link>
            <h2>{(details.event as Event).secondPersonName ? "People" : "Person"}: {(details.event as Event).firstPersonName}{(details.event as Event).secondPersonName ? ` and ${(details.event as Event).secondPersonName}` : ''}</h2>
            <h2>Date: {new Date((details.event as Event).date).toLocaleDateString('en-ca')}</h2>
            <h2>Congregation: {(details.event as Event).congregation}</h2>
            <h2>Parish: {(details.event as Event).parish}</h2>
            <h2>Archdeaconry: {(details.event as Event).archdeaconry}</h2>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.event.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);