import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/archdeaconry/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userHelper';
import { bindActionCreators } from 'redux';
import DetailsList from '../shared/DetailsList';
import { formattedDate, peoplesNames } from '../../helpers/eventHelper';
import { congregationItems, eventItems, parishItems } from '../../helpers/detailsHelpers';

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
                    itemType="parish"
                    itemTotal={details.parishResults.totalResults}
                    items={parishItems(details.parishResults)}
                />
                <DetailsList
                    itemType="congregation"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
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
    (state: State) => ({ ...state.archdeaconry.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);