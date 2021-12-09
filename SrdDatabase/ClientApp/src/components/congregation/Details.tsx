import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/congregation/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userHelper';
import DetailsBox from '../shared/DetailsBox';
import DetailsList from '../shared/DetailsList';
import { bindActionCreators } from 'redux';
import { formattedDate, peoplesNames } from '../../helpers/eventHelper';
import { eventItems } from '../../helpers/detailsHelpers';

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

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.congregation.name} Congregation</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/congregation/edit/${details.congregation.id}`}>
                    Edit congregation
                </Link>
            }
            <div className="details-boxes">
                <DetailsBox
                    itemType="parish"
                    itemValue={details.congregation.parish}
                    itemId={details.congregation.parishId}
                />
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.congregation.archdeaconry}
                    itemId={details.congregation.archdeaconryId}
                />
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.congregation.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);