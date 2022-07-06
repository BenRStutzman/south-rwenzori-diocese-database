import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { stringNumberOfChristians } from '../../helpers/censusHelper';
import { archdeaconryItems, quotaItems, congregationItems, eventItems, parishItems, paymentItems, populationItems } from '../../helpers/detailsHelpers';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';
import { currentYearQuotaString } from '../../helpers/quotaHelper';
import { atLeast } from '../../helpers/userHelper';
import { State } from '../../store';
import * as Store from '../../store/home';
import * as SharedStore from '../../store/shared';
import DetailsBox from '../shared/DetailsBox';
import DetailsList from '../shared/DetailsList';
import LoadingSpinner from '../shared/LoadingSpinner';
import { userRole } from '../../models/user';

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

    const canEditStructure = currentUser && atLeast.editor.includes(currentUser.userType);
    const canAddEventsAndCensuses = currentUser && atLeast.contributor.includes(currentUser.userType);
    const canViewFinances = currentUser && atLeast.viewer.includes(currentUser.userType);
    const canEditFinances = currentUser && atLeast.accountant.includes(currentUser.userType);

    return currentUser?.userType === userRole.sacco ? <Redirect to='/sacco' />
        : detailsLoading ? <LoadingSpinner fullPage /> :
            <>U
                <h1>South Rwenzori Diocese</h1>
                <div className="details-boxes">
                    <DetailsList
                        itemType="archdeaconry"
                        itemTotal={details.archdeaconryResults.totalResults}
                        items={archdeaconryItems(details.archdeaconryResults)}
                        showAddLink={canEditStructure}
                    />
                    <DetailsList
                        itemType="parish"
                        itemTotal={details.parishResults.totalResults}
                        items={parishItems(details.parishResults)}
                        showAddLink={canEditStructure}
                    />
                    <DetailsList
                        itemType="congregation"
                        itemTotal={details.congregationResults.totalResults}
                        items={congregationItems(details.congregationResults)}
                        showAddLink={canEditStructure}
                    />
                    <DetailsList
                        altTitle={`Christians: ${stringNumberOfChristians(details.numberOfChristians)}`}
                        itemType="census"
                        items={populationItems(details.population)}
                        dontLinkItems
                        showAddLink
                    />
                    {
                        canEditFinances && 
                        <DetailsBox
                            altTitle={`Balance: ${parenthesizeIfNegative(details.balance as number)} UGX`}
                            altLink="/report"
                            altLinkText="Create financial report"
                        />
                    }
                    {
                        canViewFinances &&
                        <>
                            <DetailsList
                                itemType="quota"
                                altTitle={currentYearQuotaString(details.quota)}
                                items={quotaItems(details.quotaResults)}
                                showAddLink={canEditFinances}
                            />
                            <DetailsList
                                itemType="payment"
                                itemTotal={details.paymentResults.totalResults}
                                items={paymentItems(details.paymentResults)}
                                showAddLink={canEditFinances}
                            />
                        </>
                    }
                    <DetailsList
                        itemType="event"
                        itemTotal={details.eventResults.totalResults}
                        items={eventItems(details.eventResults)}
                        showAddLink={canAddEventsAndCensuses}
                    />
                </div>
            </>
};

export default connect(
    (state: State) => ({ ...state.home, ...state.shared }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
