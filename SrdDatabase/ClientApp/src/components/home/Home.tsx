import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stringNumberOfChristians } from '../../helpers/censusHelper';
import { archdeaconryItems, censusItems, quotaItems, congregationItems, eventItems, parishItems, paymentItems } from '../../helpers/detailsHelpers';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';
import { currentYearQuotaString } from '../../helpers/quotaHelper';
import { atLeast } from '../../helpers/userHelper';
import { State } from '../../store';
import * as Store from '../../store/home';
import * as SharedStore from '../../store/shared';
import DetailsBox from '../shared/DetailsBox';
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

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canAddEvents = currentUser && atLeast.contributor.includes(currentUser.userType);
    const canAddCensuses = currentUser && atLeast.contributor.includes(currentUser.userType);
    const canViewTransactions = currentUser && atLeast.accountant.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>South Rwenzori Diocese</h1>
            <div className="details-boxes">
                <DetailsList
                    itemType="archdeaconry"
                    itemTotal={details.archdeaconryResults.totalResults}
                    items={archdeaconryItems(details.archdeaconryResults)}
                    showAddLink={canEdit}
                />
                <DetailsList
                    itemType="parish"
                    itemTotal={details.parishResults.totalResults}
                    items={parishItems(details.parishResults)}
                    showAddLink={canEdit}
                />
                <DetailsList
                    itemType="congregation"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
                    showAddLink={canEdit}
                />
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    showAddLink={canAddEvents}
                />
                {
                    canViewTransactions &&
                    <>
                        <DetailsList
                            itemType="quota"
                            altTitle={currentYearQuotaString(details.quota)}
                            items={quotaItems(details.quotaResults)}
                            showAddLink
                        />
                        <DetailsList
                            itemType="payment"
                            itemTotal={details.paymentResults.totalResults}
                            items={paymentItems(details.paymentResults)}
                            showAddLink
                        />
                        <DetailsBox
                            altTitle={`Balance: ${parenthesizeIfNegative(details.balance as number)} UGX`}
                            altLink="/report"
                            altLinkText="Create financial report"
                        />
                    </>
                }
                <DetailsList
                    itemType="census"
                    altTitle={`Christians: ${stringNumberOfChristians(details.numberOfChristians)}`}
                    items={censusItems(details.censusResults)}
                    showAddLink={canAddCensuses}
                />
            </div>
        </>
};

export default connect(
    (state: State) => ({ ...state.home, ...state.shared }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
