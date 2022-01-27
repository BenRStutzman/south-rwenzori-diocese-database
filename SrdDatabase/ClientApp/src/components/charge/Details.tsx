﻿import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/charge/details';
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { formattedDate } from '../../helpers/miscellaneous';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ chargeId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    history,
    deletingChargeId,
    deleteCharge,
}: Props) => {
    const loadData = () => {
        const chargeId = parseInt(match.params.chargeId);
        loadDetails(chargeId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteCharge(details.charge, () => { history.push('/charge'); });
    };

    return detailsLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1 className="page-title">{`Charge of ${details.charge.amountPerYear} UGX per year`}</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-primary" to={`/charge/edit/${details.charge.id}`}>
                        Edit charge
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {details.charge.id === deletingChargeId ? <Spinner size="sm" /> : 'Delete charge'}
                    </button>
                </div>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="yearsFallApart"
                    itemValue={`${details.charge.startYear} to ${details.charge.endYear ?? 'ongoing'}`}
                />
                <DetailsBox
                    itemType="congregation"
                    itemValue={details.charge.congregation}
                    itemId={details.charge.congregationId}
                />
                <DetailsBox
                    itemType="parish"
                    itemValue={details.charge.parish}
                    itemId={details.charge.parishId}
                />
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.charge.archdeaconry}
                    itemId={details.charge.archdeaconryId}
                 />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.charge.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);