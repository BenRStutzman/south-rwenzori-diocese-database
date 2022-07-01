import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parenthesizeIfNegative } from '../../../helpers/miscellaneous';
import { loanItems, memberItems, paymentItems, transactionItems } from '../../../helpers/sacco/detailsHelpers';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/home';
import DetailsBox from '../../shared/DetailsBox';
import DetailsList from '../../shared/DetailsList';
import LoadingSpinner from '../../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Home = ({
    details,
    detailsLoading,
    loadDetails,
}: Props) => {
    const loadData = () => {
        loadDetails();
    };

    useEffect(loadData, []);

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>SRD Savings and Credit Co-Operative Society</h1>
            <div className="details-boxes">
                <DetailsBox
                    altTitle={`Shares: ${details.shares} (${details.sharesValue?.toLocaleString()} UGX)`}
                />
                <DetailsBox
                    altTitle={`Savings: ${parenthesizeIfNegative(details.savings)} UGX`}
                />
                <DetailsBox
                    altTitle={`Balance: ${parenthesizeIfNegative(details.balance)} UGX`}
                />
                <DetailsBox
                    altTitle={`Loan Balance: ${details.loanBalance?.toLocaleString()} UGX`}
                />
                <DetailsList
                    itemType="member"
                    itemTotal={details.memberResults.totalResults}
                    items={memberItems(details.memberResults)}
                    showAddLink
                    isSacco
                />
                <DetailsList
                    itemType="transaction"
                    itemTotal={details.transactionResults.totalResults}
                    items={transactionItems(details.transactionResults, true)}
                    showAddLink
                    isSacco
                />
                <DetailsList
                    itemType="loan"
                    itemTotal={details.loanResults.totalResults}
                    items={loanItems(details.loanResults, true)}
                    isSacco
                    showAddLink
                />
                <DetailsList
                    itemType="payment"
                    itemTotal={details.paymentResults.totalResults}
                    items={paymentItems(details.paymentResults, true)}
                    isSacco
                    showAddLink
                 />
            </div>
        </>
};

export default connect(
    (state: State) => state.sacco.home,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
