import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/charge/save';
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
    & RouteComponentProps<{ chargeId: string }>;

const Edit = ({
    chargeLoading,
    history,
    charge,
    loadCharge,
    deleteCharge,
    deletingChargeId,
    match,
}: Props) => {
    const loadData = () => {
        const chargeId = parseInt(match.params.chargeId);
        loadCharge(chargeId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteCharge(charge, () => { history.push('/charge'); });
    };

    return chargeLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1 className="page-title">{`Edit charge of ${charge.amountPerYear} UGX per year`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/charge/details/${charge.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {charge.id === deletingChargeId ? <Spinner size="sm" /> : 'Delete charge'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.charge.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
