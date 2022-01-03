import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { archdeaconryItems, congregationItems, eventItems, parishItems, transactionItems } from '../../helpers/detailsHelpers';
import { atLeast } from '../../helpers/userHelper';
import { State } from '../../store';
import * as Store from '../../store/home';
import * as SharedStore from '../../store/shared';
import DetailsList from '../shared/DetailsList';
import LoadingSpinner from '../shared/LoadingSpinner';

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

    return <>
        <h1 className="page-title">South Rwenzori Diocese</h1>
        {
            detailsLoading ? <LoadingSpinner /> :
                <div className="details-boxes">
                    <DetailsList
                        itemType="archdeaconry"
                        itemTotal={details.archdeaconryResults.totalResults}
                        items={archdeaconryItems(details.archdeaconryResults)}
                    />
                    <DetailsList
                        itemType="parish"
                        itemTotal={details.parishResults.totalResults}
                        items={parishItems(details.parishResults)}
                    />
                    <DetailsList
                        itemType="congregation"
                        itemTotal={details.congregationResults.totalResults}
                        items={congregationItems(details.congregationResults)}
                    />
                    <DetailsList
                        itemType="event"
                        itemTotal={details.eventResults.totalResults}
                        items={eventItems(details.eventResults)}
                    />
                    {
                        currentUser && atLeast.accountant.includes(currentUser.userType) &&
                        <DetailsList
                            itemType="transaction"
                            itemTotal={details.transactionResults.totalResults}
                            items={transactionItems(details.transactionResults)}
                        />
                    }
                </div>
        }
        </>
};

export default connect(
    (state: State) => ({ ...state.home, ...state.shared }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
