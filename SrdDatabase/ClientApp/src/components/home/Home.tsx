import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { archdeaconryItems, congregationItems, eventItems, parishItems, paymentItems } from '../../helpers/detailsHelpers';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';
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
    const canViewBalance = currentUser && atLeast.accountant.includes(currentUser.userType);

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
                    canViewBalance &&
                    <DetailsList
                        altTitle={`Balance: ${parenthesizeIfNegative(details.balance as number)} UGX`}
                        itemType="payment"
                        secondType="charge"
                        items={paymentItems(details.paymentResults)}
                        showAddLink
                    />
                }
                <DetailsBox
                    itemValue={details.numberOfChristians?.toString()}
                    itemType="numberOfChristians"
                />
            </div>
        </>
};

export default connect(
    (state: State) => ({ ...state.home, ...state.shared }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
