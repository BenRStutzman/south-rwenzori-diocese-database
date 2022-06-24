import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/installment/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { describeInstallment } from '../../../helpers/sacco/installmentHelper';
import DetailsList from '../../shared/DetailsList';
import { fineWindowItems } from '../../../helpers/sacco/detailsHelpers';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ installmentId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
}: Props) => {
    const loadData = () => {
        const installmentId = parseInt(match.params.installmentId);
        loadDetails(installmentId);
    };

    React.useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeInstallment(details.installment)}</h1>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    baseItemType="installment"
                    itemType="member"
                    itemValue={details.installment.member}
                    itemId={details.installment.memberId}
                    isSacco
                    altPreposition="by"
                />
                <DetailsBox
                    baseItemType="installment"
                    itemType="loan"
                    itemValue={`${details.installment.loan} Loan`}
                    itemId={details.installment.loanId}
                    isSacco
                    altPreposition="for"
                />
                <DetailsBox
                    itemType="principalDue"
                    itemValue={`${details.installment.principal?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="principalPaid"
                    itemValue={`${details.installment.principalPaid?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="interestDue"
                    itemValue={`${details.installment.interest?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="interestPaid"
                    itemValue={`${details.installment.interestPaid?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="totalDue"
                    itemValue={`${details.installment.totalDue?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="totalPaid"
                    itemValue={`${details.installment.totalPaid?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="balance"
                    itemValue={`${details.installment.balance?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="progress"
                    itemValue={`${details.installment.percentagePaid}%`}
                />
                <DetailsBox
                    itemType="dateDue"
                    itemValue={formattedDate(details.installment.dateDue)}
                />
                <DetailsList
                    itemType="fineWindow"
                    altTitle="Fine Schedule"
                    items={fineWindowItems(details.fineWindows)}
                    dontLinkItems
                    dontViewAll
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.installment.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);