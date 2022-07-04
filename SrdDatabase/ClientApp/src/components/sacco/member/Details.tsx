import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/member/details'
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';
import DetailsList from '../../shared/DetailsList';
import { distributionAppliedItems, feeItems, loanItems, paymentItems, transactionItems } from '../../../helpers/sacco/detailsHelpers';
import DetailsBox from '../../shared/DetailsBox';
import { formattedDate, parenthesizeIfNegative } from '../../../helpers/miscellaneous';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ memberId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    deletingMemberIds,
    deleteMember,
    history,
}: Props) => {
    const loadData = () => {
        const memberId = parseInt(match.params.memberId);
        loadDetails(memberId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteMember(details.member, () => { history.push('/sacco/member'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>Member {details.member.name}{details.member.isChurch ? ' (church)' : ''}</h1>
                <Link to={`/sacco/report?memberId=${details.member.id}`}>Create account report</Link>
                <div>
                    <div className="button-group float-right">
                        <Link className="btn btn-primary" to={`/sacco/member/edit/${details.member.id}`}>
                            Edit member
                        </Link>
                        <button className='btn btn-danger' type="button" onClick={onDelete}>
                            {deletingMemberIds.includes(details.member.id as number) ? <Spinner size="sm" /> : "Delete member"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="accountNumber"
                    itemValue={details.member.accountNumber?.toString()}
                />
                <DetailsBox
                    itemType="balance"
                    itemValue={`${parenthesizeIfNegative(details.member.balance)} UGX`}
                />
                <DetailsBox
                    itemType="shares"
                    itemValue={`${details.member.shares?.toLocaleString()} / ${details.member.sharesValue?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="savings"
                    itemValue={`${parenthesizeIfNegative(details.member.savings)} UGX`}
                />
                <DetailsBox
                    itemType="dateJoined"
                    itemValue={formattedDate(details.member.dateJoined)}
                />
                <DetailsList
                    itemType="membershipFee"
                    itemTotal={details.member.yearsOfFees}
                    items={feeItems(details.member)}
                    dontLinkItems
                    dontViewAll
                />
                <DetailsList
                    itemType="transaction"
                    itemTotal={details.transactionResults.totalResults}
                    items={transactionItems(details.transactionResults)}
                    baseItemType="member"
                    baseItemId={details.member.id}
                    altPreposition="by"
                    isSacco
                    showAddLink
                />
                <DetailsList
                    itemType="distribution"
                    itemTotal={details.distributionAppliedResults.totalResults}
                    items={distributionAppliedItems(details.distributionAppliedResults)}
                    isSacco
                    showAddLink
                />
                <DetailsList
                    itemType="loan"
                    itemTotal={details.loanResults.totalResults}
                    items={loanItems(details.loanResults, true)}
                    baseItemType="member"
                    baseItemId={details.member.id}
                    altPreposition="to"
                    isSacco
                    showAddLink
                />
                <DetailsList
                    itemType="payment"
                    itemTotal={details.paymentResults.totalResults}
                    items={paymentItems(details.paymentResults, false)}
                    baseItemType="member"
                    baseItemId={details.member.id}
                    altPreposition="by"
                    isSacco
                    showAddLink
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.member.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);