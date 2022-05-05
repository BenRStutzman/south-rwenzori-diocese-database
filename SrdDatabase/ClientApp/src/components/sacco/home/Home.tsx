import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saccoMemberItems } from '../../../helpers/sacco/detailsHelpers';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/home';
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
    (state: State) => state.sacco.home,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
