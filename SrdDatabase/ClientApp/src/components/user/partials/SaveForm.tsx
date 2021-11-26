import { User, UserType } from '../../../store/user';
import { AppThunkAction } from '../../../store';
import { Action } from 'redux';
import React, { ChangeEvent } from 'react';
import { Errors } from "../../../helpers/apiHelpers";

interface Props {
    user: User;
    userTypes: UserType[];
    onSave: () => void;
    onDelete?: () => void;
    setUserTypeId: (userTypeId: number) => AppThunkAction<Action>;
    setName: (name: string) => AppThunkAction<Action>;
    setUsername: (username: string) => AppThunkAction<Action>;
    setPassword: (password: string) => AppThunkAction<Action>;
    hasBeenChanged: boolean;
    errors: Errors;
    userExists: boolean;
}

const SaveForm = ({
    user,
    userTypes,
    onSave,
    onDelete,
    setUserTypeId,
    setName,
    setUsername,
    setPassword,
    hasBeenChanged,
    errors,
    userExists,
}: Props) => {
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

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="userTypeId">User Type</label>
                <select
                    id="userTypeId"
                    className="form-control"
                    value={user.userTypeId ? user.userTypeId : ""}
                    onChange={onUserTypeIdChange}
                    required
                >
                    <option key={0} value="" disabled>--- select a user type ---</option>
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
                    id="name"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={user.name ? user.name : ""}
                    onChange={onNameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={user.username ? user.username : ""}
                    onChange={onUsernameChange}
                    maxLength={50}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">{userExists ? 'Reset password' : 'Password'}</label>
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    spellCheck={false}
                    value={user.password ? user.password : ""}
                    onChange={onPasswordChange}
                    maxLength={50}
                    required={userExists ? false : true}
                />
                {
                    userExists &&
                    <p className="field-note">Leave this field blank to keep the current password.</p>
                }
            </div>
            {Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}</li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {userExists ? "Update" : "Create"} user
            </button>
            {
                userExists &&
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    Delete user
                </button>
            }
        </form>
    );
}

export default SaveForm;