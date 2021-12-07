import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/archdeaconry/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userRole';
import DetailsList from '../shared/DetailsList';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadDetails(archdeaconryId);
    };

    React.useEffect(loadData, []);

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.archdeaconry.name} Archdeaconry</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/archdeaconry/edit/${details.archdeaconry.id}`}>
                    Edit archdeaconry
                </Link>
            }
            <div className="details-boxes">
                <DetailsList
                    title="Parishes"
                    itemType="parish"
                    items={details.parishes.map(parish => ({ id: parish.id, displayText: parish.name}))}
                />
                <DetailsList
                    title="Congregations"
                    itemType="congregation"
                    items={details.congregations.map(congregation => ({ id: congregation.id, displayText: congregation.name }))}
                />
                <DetailsList
                    title="Recent Events"
                    itemType="event"
                    items={details.recentEvents.map(event => ({
                        id: event.id,
                        displayText: `${new Date(event.date as Date).toLocaleDateString('en-ca')}: ${event.eventType} of ${event.firstPersonName}${event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at ${event.congregation} Congregation`,
                    }))}
                />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.archdeaconry.details, ...state.shared }),
    () => ({ ...Store.actionCreators, ...SharedStore.actionCreators })
)(Details);