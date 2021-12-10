import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/event/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userHelper';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { canEdit, formattedDate, peoplesNames } from '../../helpers/eventHelper';

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

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.event.eventType} of {peoplesNames(details.event)}</h1>
            {
                canEdit(details.event, currentUser) &&
                <Link className="btn btn-primary float-right" to={`/event/edit/${details.event.id}`}>
                    Edit event
                </Link>
            }
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.event)}
                />
                <DetailsBox
                    itemType="congregation"
                    itemValue={details.event.congregation}
                    itemId={details.event.congregationId}
                />
                <DetailsBox
                    itemType="parish"
                    itemValue={details.event.parish}
                    itemId={details.event.parishId}
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
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);