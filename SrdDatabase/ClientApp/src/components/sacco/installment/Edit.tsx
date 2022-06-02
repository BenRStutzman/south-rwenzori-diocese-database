import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/installment/save';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { describeInstallment } from '../../../helpers/sacco/installmentHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ installmentId: string }>;

const Edit = ({
    isLoading,
    history,
    installment,
    loadInstallment,
    match,
}: Props) => {
    const loadData = () => {
        const installmentId = parseInt(match.params.installmentId);
        loadInstallment(installmentId);
    };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit ${describeInstallment(installment)}`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/sacco/installment/details/${installment.id}`}>
                        View details
                    </Link>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => state.sacco.installment.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Edit);
