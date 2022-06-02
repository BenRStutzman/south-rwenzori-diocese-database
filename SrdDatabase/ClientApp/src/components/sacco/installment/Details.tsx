import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/installment/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
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
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/installment/edit/${details.installment.id}`}>
                        Edit installment
                    </Link>
                </div>
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
                    itemType="dateDue"
                    itemValue={formattedDate(details.installment.dateDue)}
                />
                <DetailsBox
                    itemType={details.installment.isPaid ? "datePaid" : "paid"}
                    itemValue={details.installment.isPaid ? formattedDate(details.installment.datePaid) : 'No'}
                />
                <DetailsBox
                    itemType="daysLate"
                    itemValue={details.installment.daysLate?.toString()}
                />
                <DetailsBox
                    itemType="receiptNumber"
                    itemValue={details.installment.receiptNumber?.toString() ?? "Not set"}
                />
                <DetailsBox
                    itemType="principal"
                    itemValue={`${details.installment.principal?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="interest"
                    itemValue={`${details.installment.interest?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="baseDue"
                    itemValue={`${details.installment.baseDue?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="lateFine"
                    itemValue={`${details.installment.fineDue?.toLocaleString()} UGX`}
                />
                <DetailsBox
                    itemType="totalDue"
                    itemValue={`${details.installment.totalDue?.toLocaleString()} UGX`}
                />
                <DetailsList
                    itemType="fineWindow"
                    altTitle="Fine schedule"
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