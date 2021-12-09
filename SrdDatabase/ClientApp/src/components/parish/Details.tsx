﻿import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/parish/details'
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { atLeast } from '../../helpers/userHelper';
import DetailsBox from '../shared/DetailsBox';
import DetailsList from '../shared/DetailsList';
import { bindActionCreators } from 'redux';
import { Event } from '../../models/event';
import { congregationItems, eventItems } from '../../helpers/detailsHelpers';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ parishId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    currentUser,
}: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadDetails(parishId);
    };

    React.useEffect(loadData, []);

    const canEdit = currentUser && atLeast.editor.includes(currentUser.userType);

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">{details.parish.name} Parish</h1>
            {
                canEdit &&
                <Link className="btn btn-primary float-right" to={`/parish/edit/${details.parish.id}`}>
                    Edit parish
                </Link>
            }
            <div className="details-boxes">
                <DetailsBox
                    itemType="archdeaconry"
                    itemValue={details.parish.archdeaconry}
                    itemId={details.parish.archdeaconryId}
                />
                <DetailsList
                    itemType="congregation"
                    itemTotal={details.congregationResults.totalResults}
                    items={congregationItems(details.congregationResults)}
                />
                <DetailsList
                    itemType="event"
                    itemTotal={details.eventResults.totalResults}
                    items={eventItems(details.eventResults)}
                />
            </div>
        </>;
}
    
export default connect(
    (state: State) => ({ ...state.parish.details, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Details);