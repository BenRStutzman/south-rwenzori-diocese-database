import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/congregation/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { User } from '../../store/user';
import { atLeast } from '../../helpers/userRole';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ congregationId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadDetails(congregationId);
    };

    React.useEffect(loadData, []);

    const canEdit = atLeast.editor.includes((currentUser as User).userType as string);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.congregation.name} Congregation</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/congregation/edit/${details.congregation.id}`}>
                    Edit congregation
                </Link>
            }
            <h2>Parish: {details.congregation.parish}</h2>
            <h2>Archdeaconry: {details.congregation.archdeaconry}</h2>
            <h2>Recent Events</h2>
            <ul>
                {details.recentEvents.map(event =>
                    <li key={event.id}>{new Date(event.date as Date).toLocaleDateString('en-ca')}: {event.eventType} of {event.firstPersonName}{event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at {event.congregation} Congregation</li>
                )}
            </ul>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.congregation.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);