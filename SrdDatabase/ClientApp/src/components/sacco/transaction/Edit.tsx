import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/transaction/save';
import * as SharedStore from '../../../store/sacco/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { describeTransaction } from '../../../helpers/sacco/transactionHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ transactionId: string }>;

const Edit = ({
    isLoading,
    history,
    transaction,
    loadTransaction,
    deleteTransaction,
    deletingTransactionIds,
    match,
}: Props) => {
    const loadData = () => {
        const transactionId = parseInt(match.params.transactionId);
        loadTransaction(transactionId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteTransaction(transaction, () => { history.push('/sacco/transaction'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit ${describeTransaction(transaction)}`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/sacco/transaction/details/${transaction.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingTransactionIds.includes(transaction.id as number) ? <Spinner size="sm" /> : 'Delete transaction'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.transaction.save, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
