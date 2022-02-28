import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/quota/details';
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';
import { formattedDates } from '../../helpers/quotaHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ quotaId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingQuotaIds,
    deleteQuota,
}: Props) => {
    const loadData = () => {
        const quotaId = parseInt(match.params.quotaId);
        loadDetails(quotaId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteQuota(details.quota, () => { history.push('/quota'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>{`Quota of ${details.quota.amountPerYear} UGX per year`}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/quota/edit/${details.quota.id}`}>
                        Edit quota
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingQuotaIds.includes(details.quota.id as number) ? <Spinner size="sm" /> : 'Delete quota'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="year(s)"
                    itemValue={formattedDates(details.quota)}
                />
                <DetailsBox
                    baseItemType="quota"
                    itemType="congregation"
                    itemValue={details.quota.congregation}
                    itemId={details.quota.congregationId}
                />
                <DetailsBox
                    baseItemType="quota"
                    itemType="parish"
                    itemValue={details.quota.parish}
                    itemId={details.quota.parishId}
                />
                <DetailsBox
                    baseItemType="quota"
                    itemType="archdeaconry"
                    itemValue={details.quota.archdeaconry}
                    itemId={details.quota.archdeaconryId}
                />
            </div>
        </>;
}

export default connect(
    (state: State) => ({ ...state.quota.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);