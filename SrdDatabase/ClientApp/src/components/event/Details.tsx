import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userRole';
import { User } from '../../store/user';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ eventId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
}: Props) => {
    const loadData = () => {
        const eventId = parseInt(match.params.eventId);
        loadDetails(eventId);
    };

    React.useEffect(loadData, []);

    const canEdit = atLeast.editor.includes((currentUser as User).userType as string);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.event.eventType} Event</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/event/edit/${details.event.id}`}>
                    Edit event
                </Link>
            }
            <h2>{details.event.secondPersonName ? "People" : "Person"}: {details.event.firstPersonName}{details.event.secondPersonName ? ` and ${details.event.secondPersonName}` : ''}</h2>
            <h2>Date: {new Date(details.event.date as Date).toLocaleDateString('en-ca')}</h2>
            <h2>Congregation: {details.event.congregation}</h2>
            <h2>Parish: {details.event.parish}</h2>
            <h2>Archdeaconry: {details.event.archdeaconry}</h2>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.event.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);