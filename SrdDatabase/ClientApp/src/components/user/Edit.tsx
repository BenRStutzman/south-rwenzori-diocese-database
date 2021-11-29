import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/user/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import Form from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ userId: string }>;

const Edit = ({
    loadUser,
    loadUserTypes,
    userLoading,
    userTypesLoading,
    history,
    user,
    userTypes,
    setName,
    setUserTypeId,
    setUsername,
    setPassword,
    saveUser,
    deleteUser,
    match,
    isSaving,
    hasBeenChanged,
    errors
}: Props) => {
    const loadData = () => {
        loadUserTypes();
        const userId = parseInt(match.params.userId);
        loadUser(userId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveUser(user, history);
    };

    const onDelete = () => {
        deleteUser(user, () => { history.push('/user'); })
    };

    return userLoading || userTypesLoading || isSaving
        ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit user {user.name}</h1>
            <Link className="btn btn-secondary float-right" to={`/user/details/${user.id}`}>
                View details
            </Link>
            <Form
                user={user}
                userTypes={userTypes}
                setUserTypeId={setUserTypeId}
                setName={setName}
                setUsername={setUsername}
                setPassword={setPassword}
                onSave={onSave}
                onDelete={onDelete}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                userExists={true}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.user.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
