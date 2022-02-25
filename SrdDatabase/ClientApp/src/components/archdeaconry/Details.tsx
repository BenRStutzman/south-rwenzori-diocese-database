﻿import * as React from 'react';
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
import { censusItems, congregationItems, eventItems, parishItems, paymentItems } from '../../helpers/detailsHelpers';
import { Spinner } from 'reactstrap';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';

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
    deletingArchdeaconryIds,
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
    const canViewBalance = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onDelete = () => {
        deleteArchdeaconry(details.archdeaconry, () => { history.push('/archdeaconry'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{details.archdeaconry.name} Archdeaconry</h1>
                {
                    canEdit &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/archdeaconry/edit/${details.archdeaconry.id}`}>
                            Edit archdeaconry
                        </Link>
                        <button className='btn btn-danger' type="button" onClick={onDelete}>
                            {deletingArchdeaconryIds.includes(details.archdeaconry.id as number) ? <Spinner size="sm" /> : "Delete archdeaconry"}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsList
                    itemType="parish"
                    baseItemType="archdeaconry"
                    itemTotal={details.parishResults.totalResults}
                    items={parishItems(details.parishResults)}
                    showAddLink={canEdit}
                    addParams={`?archdeaconryId=${details.archdeaconry.id}`}
                />
                <DetailsList
                    itemType="congregation"
                    baseItemType="archdeaconry"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
                    showAddLink={canEdit}
                    addParams={`?archdeaconryId=${details.archdeaconry.id}`}
                />
                <DetailsList
                    baseItemType="archdeaconry"
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    showAddLink={canAddEvents}
                    addParams={`?archdeaconryId=${details.archdeaconry.id}`}
                />
                <DetailsList
                    altTitle={`Number of Christians: ${details.archdeaconry.numberOfChristians}`}
                    itemType="census"
                    baseItemType="archdeaconry"
                    items={censusItems(details.censusResults)}
                    showAddLink
                    addParams={`?archdeaconryId=${details.archdeaconry.id}`}
                />
                {
                    canViewBalance &&
                    <DetailsList
                        altTitle={`Balance: ${parenthesizeIfNegative(details.archdeaconry.balance as number)} UGX`}
                        itemType="payment"
                        baseItemType="archdeaconry"
                        secondType="charge"
                        items={paymentItems(details.paymentResults)}
                        showAddLink
                        addParams={`?archdeaconryId=${details.archdeaconry.id}`}
                    />
                }
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);