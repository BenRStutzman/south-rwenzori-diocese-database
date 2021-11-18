import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { State } from '../../store';
import * as Store from '../../store/user/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import Form from './Form';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps;

const Add = ({
    user,
    userLoading,
    userTypesLoading,
    userTypes,
    loadUserTypes,
    resetUser,
    history,
    setUserTypeId,
    setName,
    setUsername,
    setPassword,
    saveUser,
    hasBeenChanged,
    isSaving,
    errors
}: Props) => {
    const loadData = () => {
        loadUserTypes();
        resetUser();
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveUser(user, history);
    }

    return userLoading || userTypesLoading || isSaving
        ? <LoadingSpinner /> :
        <>
            <h1>Add User</h1>
            <Form
                user={user}
                setUserTypeId={setUserTypeId}
                setName={setName}
                setUsername={setUsername}
                setPassword={setPassword}
                onSave={onSave}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                userTypes={userTypes}
                userExists={false}
            />
        </>;
}

export default connect(
    (state: State) => state.user.save,
    Store.actionCreators
)(Add as any);
