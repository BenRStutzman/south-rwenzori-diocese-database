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
import { censusItems, quotaItems, eventItems, paymentItems } from '../../helpers/detailsHelpers';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
import { stringNumberOfChristians } from '../../helpers/censusHelper';
import { currentYearQuotaString } from '../../helpers/quotaHelper';

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
    history,
    deleteCongregation,
    deletingCongregationIds,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadDetails(congregationId);
    };

    React.useEffect(loadData, []);

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canAddEvents = currentUser && atLeast.contributor.includes(currentUser.userType);
    const canEditTransactions = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onDelete = () => {
        deleteCongregation(details.congregation, () => { history.push('/congregation'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{details.congregation.name} Congregation</h1>
                {
                    canEdit &&
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/congregation/edit/${details.congregation.id}`}>
                            Edit congregation
                        </Link>
                        <button className="btn btn-danger" type="button" onClick={onDelete}>
                            {deletingCongregationIds.includes(details.congregation.id as number) ? <Spinner size="sm" /> : "Delete congregation"}
                        </button>
                    </div>
                }
            </div>
            <div className="details-boxes">
                <DetailsBox
                    baseItemType="congregation"
                    itemType="archdeaconry"
                    itemValue={details.congregation.archdeaconry}
                    itemId={details.congregation.archdeaconryId}
                />
                <DetailsBox
                    baseItemType="congregation"
                    itemType="parish"
                    itemValue={details.congregation.parish}
                    itemId={details.congregation.parishId}
                />
                <DetailsList
                    altTitle={`Christians: ${stringNumberOfChristians(details.congregation.numberOfChristians)}`}
                    items={censusItems(details.censusResults, true)}
                    baseItemType="congregation"
                    baseItemId={details.congregation.id}
                    showAddLink
                />
                <DetailsList
                    itemType="census"
                    items={populationItems(details.member)}
                    dontLinkItems
                    dontViewAll
                />
                {
                    canEditTransactions &&
                    <>
                        <DetailsBox
                            altTitle={`Balance: ${parenthesizeIfNegative(details.congregation.balance as number)} UGX`}
                            altLink={`/report?congregationId=${details.congregation.id}`}
                            altLinkText="Create financial report"
                        />
                        <DetailsList
                            itemType="quota"
                            altTitle={currentYearQuotaString(details.congregation.quota)}
                            items={quotaItems(details.quotaResults, true)}
                            baseItemType="congregation"
                            baseItemId={details.congregation.id}
                            showAddLink
                        />
                        <DetailsList
                            itemType="payment"
                            itemTotal={details.paymentResults.totalResults}
                            items={paymentItems(details.paymentResults, true)}
                            baseItemType="congregation"
                            baseItemId={details.congregation.id}
                            showAddLink
                        />
                    </>
                }
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    baseItemType="congregation"
                    baseItemId={details.congregation.id}
                    showAddLink={canAddEvents}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.congregation.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);