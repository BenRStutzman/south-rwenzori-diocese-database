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
import { censusItems, quotaItems, congregationItems, eventItems, paymentItems } from '../../helpers/detailsHelpers';
import { Spinner } from 'reactstrap';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';
import { stringNumberOfChristians } from '../../helpers/censusHelper';
import { currentYearQuotaString } from '../../helpers/quotaHelper';

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
    deletingParishIds,
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
    const canViewTransactions = currentUser && atLeast.accountant.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{details.parish.name} Parish</h1>
                {
                    canEdit &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/parish/edit/${details.parish.id}`}>
                            Edit parish
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {deletingParishIds.includes(details.parish.id as number) ? <Spinner size="sm" /> : 'Delete parish'}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsBox
                    baseItemType="parish"
                    itemType="archdeaconry"
                    itemValue={details.parish.archdeaconry}
                    itemId={details.parish.archdeaconryId}
                />
                <DetailsList
                    itemType="congregation"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
                    baseItemType="parish"
                    baseItemId={details.parish.id}
                    showAddLink={canEdit}
                />
                <DetailsList
                    itemType="census"
                    altTitle={`Christians: ${stringNumberOfChristians(details.parish.numberOfChristians)}`}
                    items={censusItems(details.censusResults)}
                    baseItemType="parish"
                    baseItemId={details.parish.id}
                    showAddLink
                />
                {
                    canViewTransactions &&
                    <>
                        <DetailsBox
                            altTitle={`Balance: ${parenthesizeIfNegative(details.parish.balance as number)} UGX`}
                            altLink={`/report?parishId=${details.parish.id}`}
                            altLinkText="Create financial report"
                        />
                        <DetailsList
                            itemType="quota"
                            altTitle={currentYearQuotaString(details.parish.quota)}
                            items={quotaItems(details.quotaResults)}
                            baseItemType="parish"
                            baseItemId={details.parish.id}
                            showAddLink
                        />
                        <DetailsList
                            itemType="payment"
                            itemTotal={details.paymentResults.totalResults}
                            items={paymentItems(details.paymentResults)}
                            baseItemType="parish"
                            baseItemId={details.parish.id}
                            showAddLink
                        />
                    </>
                }
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    baseItemType="parish"
                    baseItemId={details.parish.id}
                    showAddLink={canAddEvents}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.parish.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);