import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/loan/save';
import * as SharedStore from '../../../store/sacco/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { describeLoan } from '../../../helpers/sacco/loanHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ loanId: string }>;

const Edit = ({
    isLoading,
    history,
    loan,
    loadLoan,
    deleteLoan,
    deletingLoanIds,
    match,
}: Props) => {
    const loadData = () => {
        const loanId = parseInt(match.params.loanId);
        loadLoan(loanId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteLoan(loan, () => { history.push('/sacco/loan'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit ${describeLoan(loan)}`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/sacco/loan/details/${loan.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingLoanIds.includes(loan.id as number) ? <Spinner size="sm" /> : 'Delete loan'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.loan.save, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
