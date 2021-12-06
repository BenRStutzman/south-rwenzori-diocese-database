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
import DetailsBox from '../shared/DetailsBox';

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

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType as string);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.event.eventType} Event</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/event/edit/${details.event.id}`}>
                    Edit event
                </Link>
            }
            <div className="details-boxes">
                <DetailsBox
                    itemType={details.event.secondPersonName ? "people" : "person"}
                    itemValue={`${details.event.firstPersonName}${details.event.secondPersonName ? ` and ${details.event.secondPersonName}` : ''}`}
                />
                <DetailsBox
                    itemType="date"
                    itemValue={details.event.date ? new Date(details.event.date).toLocaleDateString('en-ca') : ''}
                />
                <DetailsBox
                    itemType="congregation"
                    itemValue={details.event.congregation}
                    itemId={details.event.congregationId}
                />
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.event.archdeaconry}
                    itemId={details.event.archdeaconryId}
                 />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.event.details, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Details as any);