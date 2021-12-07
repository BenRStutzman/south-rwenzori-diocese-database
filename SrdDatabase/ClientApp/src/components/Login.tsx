﻿import React, { ChangeEvent, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { State } from '../store';
import * as Store from '../store/login';
import * as SharedStore from '../store/shared';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps;

const Login = ({
    authenticate,
    setUsername,
    setPassword,
    isAuthenticating,
    resetCredentials,
    credentials,
    history,
    location,
    logout,
}: Props) => {
    const loadData = () => {
        logout();
        resetCredentials();
    }

    useEffect(loadData, []);

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        authenticate(credentials, history, location);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    value={credentials.username ? credentials.username : ''}
                    onChange={onUsernameChange}
                    required
                    maxLength={50}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    spellCheck={false}
                    value={credentials.password ? credentials.password : ''}
                    onChange={onPasswordChange}
                    required
                    maxLength={50}
                />
            </div>
            <button disabled={!credentials.username || !credentials.password} className="btn btn-primary" type="submit">
                {isAuthenticating ? <Spinner size="sm" /> : 'Log in'}
            </button>
        </form>
    );
}

export default connect(
    (state: State) => ({ ...state.login, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Login);
