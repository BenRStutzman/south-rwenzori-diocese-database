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
    history,
    deletingInstallmentIds,
    deleteInstallment,
}: Props) => {
    const loadData = () => {
        const installmentId = parseInt(match.params.installmentId);
        loadDetails(installmentId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteInstallment(details.installment, () => { history.push('/sacco/installment'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeInstallment(details.installment)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/installment/edit/${details.installment.id}`}>
                        Edit installment
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingInstallmentIds.includes(details.installment.id as number) ? <Spinner size="sm" /> : 'Delete installment'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.installment.date)}
                />
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
                    itemType="receiptNumber"
                    itemValue={details.installment.receiptNumber?.toString() ?? "Not set"}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.installment.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);