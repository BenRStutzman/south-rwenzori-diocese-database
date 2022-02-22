import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { canEdit, describeEvent } from '../../helpers/eventHelper';
import { formattedDate } from '../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';

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
    deletingEventIds,
    deleteEvent,
    history,
}: Props) => {
    const loadData = () => {
        const eventId = parseInt(match.params.eventId);
        loadDetails(eventId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteEvent(details.event, () => { history.push('/event'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeEvent(details.event)}</h1>
                {
                    canEdit(details.event, currentUser) &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/event/edit/${details.event.id}`}>
                            Edit event
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {deletingEventIds.includes(details.event.id as number) ? <Spinner size="sm" /> : 'Delete event'}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.event.date)}
                />
                {
                    details.event.congregationId &&
                    <DetailsBox
                        baseItemType="event"
                        itemType="congregation"
                        itemValue={details.event.congregation}
                        itemId={details.event.congregationId}
                    />
                }
                <DetailsBox
                    baseItemType="event"
                    itemType="parish"
                    itemValue={details.event.parish}
                    itemId={details.event.parishId}
                />
                <DetailsBox
                    baseItemType="event"
                    itemType="archdeaconry"
                    itemValue={details.event.archdeaconry}
                    itemId={details.event.archdeaconryId}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.event.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);