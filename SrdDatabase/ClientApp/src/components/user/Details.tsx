﻿import * as React from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/user/details';
import * as SharedStore from '../../store/shared';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import DetailsBox from '../shared/DetailsBox';
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ userId: string }>;

const Details = ({
    loadDetails,
    detailsLoading,
    details,
    match,
    deletingUserId,
    deleteUser,
    history,
}: Props) => {
    const loadData = () => {
        const userId = parseInt(match.params.userId);
        loadDetails(userId);
    };

    React.useEffect(loadData, []);

    const onDelete = () => {
        deleteUser(details.user, () => { history.push('/user'); })
    };

    return detailsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">User {details.user.name}</h1>
            <div className="button-group float-right">
                <Link className="btn btn-primary" to={`/user/edit/${details.user.id}`}>
                    Edit user
                </Link>
                <button className="btn btn-danger" type="button" onClick={onDelete}>
                    {details.user.id === deletingUserId ? <Spinner size="sm" /> : 'Delete user'}
                </button>
            </div>
            <div className="details-boxes">
                <DetailsBox
                    itemType="username"
                    itemValue={details.user.username}
                />
                <DetailsBox
                    itemType="user type"
                    itemValue={details.user.userType}
                />
            </div>
        </>;
}
    
export default connect(
    (state: State) => state.user.details,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Details);