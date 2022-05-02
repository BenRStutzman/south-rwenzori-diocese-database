import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saccoMemberItems } from '../../../helpers/detailsHelpers';
import { atLeast } from '../../../helpers/userHelper';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/home';
import * as SharedStore from '../../../store/shared';
import DetailsList from '../../shared/DetailsList';
import LoadingSpinner from '../../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State;

const Home = ({
    details,
    detailsLoading,
    loadDetails,
    currentUser,
}: Props) => {
    const loadData = () => {
        loadDetails();
    };

    useEffect(loadData, []);

    currentUser && atLeast.accountant.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>SRD Savings and Credit Co-Operative Society</h1>
            <div className="details-boxes">
                <DetailsList
                    itemType="member"
                    itemTotal={details.memberResults.totalResults}
                    items={saccoMemberItems(details.memberResults)}
                    showAddLink
                    isSacco
                />
            </div>
        </>
};

export default connect(
    (state: State) => ({ ...state.sacco.home, ...state.shared }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
