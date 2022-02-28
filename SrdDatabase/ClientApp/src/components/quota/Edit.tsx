import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/quota/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ quotaId: string }>;

const Edit = ({
    isLoading,
    history,
    quota,
    loadQuota,
    deleteQuota,
    deletingQuotaIds,
    match,
}: Props) => {
    const loadData = () => {
        const quotaId = parseInt(match.params.quotaId);
        loadQuota(quotaId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteQuota(quota, () => { history.push('/quota'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit quota of ${quota.amountPerYear} UGX per year`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/quota/details/${quota.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingQuotaIds.includes(quota.id as number) ? <Spinner size="sm" /> : 'Delete quota'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.quota.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
