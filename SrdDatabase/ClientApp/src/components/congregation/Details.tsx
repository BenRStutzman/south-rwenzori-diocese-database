import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/congregation/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userHelper';
import DetailsBox from '../shared/DetailsBox';
import DetailsList from '../shared/DetailsList';
import { bindActionCreators } from 'redux';
import { eventItems, transactionItems } from '../../helpers/detailsHelpers';
import { parenthesizeIfNegative } from '../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ congregationId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
    history,
    deleteCongregation,
    deletingCongregationId,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadDetails(congregationId);
    };

    React.useEffect(loadData, []);

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);
    const canAddEvents = currentUser && atLeast.contributor.includes(currentUser.userType);
    const canEditTransactions = currentUser && atLeast.accountant.includes(currentUser.userType);

    const onDelete = () => {
        deleteCongregation(details.congregation, () => { history.push('/congregation'); });
    };

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.congregation.name} Congregation</h1>
            {
                canEdit &&
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/congregation/edit/${details.congregation.id}`}>
                        Edit congregation
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {details.congregation.id === deletingCongregationId ? <Spinner size="sm" /> : "Delete congregation"}
                    </button>
                </div>
            }
            <div className="details-boxes">
                <DetailsBox
                    itemType="parish"
                    itemValue={details.congregation.parish}
                    itemId={details.congregation.parishId}
                />
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.congregation.archdeaconry}
                    itemId={details.congregation.archdeaconryId}
                />
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                    showAddLink={canAddEvents}
                    addParams={`/${details.congregation.id}`}
                />
                {
                    canEditTransactions &&
                    <DetailsList
                        altTitle={`Balance: ${parenthesizeIfNegative(details.congregation.balance as number)} UGX`}
                        itemType="transaction"
                        itemTotal={details.transactionResults.totalResults}
                        items={transactionItems(details.transactionResults)}
                        showAddLink={canEditTransactions}
                        addParams={`/${details.congregation.id}`}
                    />
                }
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.congregation.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);