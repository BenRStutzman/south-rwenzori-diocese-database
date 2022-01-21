import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import * as Store from '../../../store/user/save';
import * as SharedStore from '../../../store/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { randomString } from '../../../helpers/miscellaneous';

const autoComplete = randomString();

interface OwnProps {
    isNew?: boolean;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    userLoading,
    loadUserTypes,
    userTypesLoading,
    user,
    userTypes,
    saveUser,
    setUserTypeId,
    setName,
    setUsername,
    setPassword,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
}: Props) => {
    const loadData = () => {
        loadUserTypes();
    };

    useEffect(loadData, []);

    const onUserTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUserTypeId(parseInt(event.target.value));
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveUser(user, history);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="userTypeId">User Type</label>
                <select
                    id="userTypeId"
                    className="form-control"
                    value={user.userTypeId ?? ""}
                    onChange={onUserTypeIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {userTypesLoading ? 'Loading...' : '--- select a user type ---'}
                    </option>
                    {userTypes.map(userType =>
                        <option key={userType.id} value={userType.id}>
                            {userType.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    autoComplete={autoComplete}
                    id="name"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={user.name ?? ""}
                    onChange={onNameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    autoComplete={autoComplete}
                    id="username"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={user.username ?? ""}
                    onChange={onUsernameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">{isNew ? 'Password' : 'Reset password'}</label>
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    spellCheck={false}
                    autoComplete={autoComplete}
                    value={user.password ?? ""}
                    onChange={onPasswordChange}
                    minLength={8}
                    maxLength={50}
                    required={isNew}
                />
                {
                    !isNew &&
                    <p className="field-note">Leave this field blank to keep the current password.</p>
                }
            </div>
            {Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}
                        </li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} user`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.user.save,
    ...state.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));