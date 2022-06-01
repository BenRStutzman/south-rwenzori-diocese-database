import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/distribution/details';
import * as SharedStore from '../../../store/sacco/shared';
import { State } from '../../../store';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';
import { describeDistribution } from '../../../helpers/sacco/distributionHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ distributionId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingDistributionIds,
    deleteDistribution,
}: Props) => {
    const loadData = () => {
        const distributionId = parseInt(match.params.distributionId);
        loadDetails(distributionId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteDistribution(details.distribution, () => { history.push('/sacco/distribution'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{describeDistribution(details.distribution)}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/sacco/distribution/edit/${details.distribution.id}`}>
                        Edit distribution
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingDistributionIds.includes(details.distribution.id as number) ? <Spinner size="sm" /> : 'Delete distribution'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="date"
                    itemValue={formattedDate(details.distribution.date)}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.sacco.distribution.details, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);