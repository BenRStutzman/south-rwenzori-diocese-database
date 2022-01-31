import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/user/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ userId: string }>;

const Edit = ({
    loadUser,
    isLoading,
    history,
    user,
    deleteUser,
    match,
    deletingUserId,
}: Props) => {
    const loadData = () => {
        const userId = parseInt(match.params.userId);
        loadUser(userId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteUser(user, () => { history.push('/user'); })
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1 className="page-title">Edit user {user.name}</h1>
            <div className="float-right button-group">
                <Link className="btn btn-secondary" to={`/user/details/${user.id}`}>
                    View details
                </Link>
                <button className="btn btn-danger" type="button" onClick={onDelete}>
                    {user.id === deletingUserId ? <Spinner size="sm" /> : 'Delete user'}
                </button>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.user.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
