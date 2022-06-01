import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../store';
import * as Store from '../../../store/sacco/distribution/save';
import * as SharedStore from '../../../store/sacco/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { describeDistribution } from '../../../helpers/sacco/distributionHelper';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ distributionId: string }>;

const Edit = ({
    isLoading,
    history,
    distribution,
    loadDistribution,
    deleteDistribution,
    deletingDistributionIds,
    match,
}: Props) => {
    const loadData = () => {
        const distributionId = parseInt(match.params.distributionId);
        loadDistribution(distributionId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteDistribution(distribution, () => { history.push('/sacco/distribution'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Edit ${describeDistribution(distribution)}`}</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/sacco/distribution/details/${distribution.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingDistributionIds.includes(distribution.id as number) ? <Spinner size="sm" /> : 'Delete distribution'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.distribution.save, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
