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
import { congregationItems, eventItems, parishItems } from '../../helpers/detailsHelpers';
import { Spinner } from 'reactstrap';

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
    deletingArchdeaconryId,
    deleteArchdeaconry,
    history,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadDetails(archdeaconryId);
    };

    React.useEffect(loadData, []);

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canAddEvents = currentUser && atLeast.contributor.includes(currentUser.userType);

    const onDelete = () => {
        deleteArchdeaconry(details.archdeaconry, () => { history.push('/archdeaconry'); });
    };

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <div className="page-heading">
                <h1 className="page-title">{details.archdeaconry.name} Archdeaconry</h1>
                {
                    canEdit &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/archdeaconry/edit/${details.archdeaconry.id}`}>
                            Edit archdeaconry
                        </Link>
                        <button className='btn btn-danger' type="button" onClick={onDelete}>
                            {details.archdeaconry.id === deletingArchdeaconryId ? <Spinner size="sm" /> : "Delete archdeaconry"}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsList
                    itemType="parish"
                    itemTotal={details.parishResults.totalResults}
                    items={parishItems(details.parishResults)}
                    showAddLink={canEdit}
                    addParams={`/${details.archdeaconry.id}`}
                />
                <DetailsList
                    itemType="congregation"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
                    showAddLink={canEdit}
                />
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    showAddLink={canAddEvents}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);