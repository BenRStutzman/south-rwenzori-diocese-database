import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/parish/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userHelper';
import DetailsBox from '../shared/DetailsBox';
import DetailsList from '../shared/DetailsList';
import { bindActionCreators } from 'redux';
import { Event } from '../../models/event';
import { congregationItems, eventItems } from '../../helpers/detailsHelpers';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ parishId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
    deleteParish,
    deletingParishId,
    history,
}: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadDetails(parishId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteParish(details.parish, () => { history.push('/parish'); });
    };

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canAddEvents = currentUser && atLeast.contributor.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <div className="page-heading">
                <h1 className="page-title">{details.parish.name} Parish</h1>
                {
                    canEdit &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/parish/edit/${details.parish.id}`}>
                            Edit parish
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {details.parish.id === deletingParishId ? <Spinner size="sm" /> : 'Delete parish'}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.parish.archdeaconry}
                    itemId={details.parish.archdeaconryId}
                />
                <DetailsList
                    itemType="congregation"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
                    showAddLink={canEdit}
                    addParams={`/${details.parish.id}`}
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
    (state: State) => ({ ...state.parish.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);