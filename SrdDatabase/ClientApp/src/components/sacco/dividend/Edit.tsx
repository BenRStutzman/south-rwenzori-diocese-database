import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/dividend/save';
import * as SharedStore from '../../../store/sacco/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { describeDividend } from '../../../helpers/sacco/dividendHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ dividendId: string }>;

const Edit = ({
    isLoading,
    history,
    dividend,
    loadDividend,
    deleteDividend,
    deletingDividendIds,
    match,
}: Props) => {
    const loadData = () => {
        const dividendId = parseInt(match.params.dividendId);
        loadDividend(dividendId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteDividend(dividend, () => { history.push('/sacco/dividend'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit ${describeDividend(dividend)}`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/sacco/dividend/details/${dividend.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingDividendIds.includes(dividend.id as number) ? <Spinner size="sm" /> : 'Delete dividend'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.dividend.save, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
