import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/user/home';
import * as SharedStore from '../../store/shared';
import { User } from '../../store/user';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const Home = ({
    resultsLoading,
    results,
    searchUsers,
    loadUserTypes,
    userTypes,
    setSearchUsername,
    setSearchName,
    setSearchUserTypeId,
    parameters,
    resetParameters,
    deleteUser,
    deletingId,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadUserTypes();
        searchUsers();
    };

    useEffect(loadData, []);

    const onSearch = () => {
        searchUsers(true, parameters);
    };

    const onDelete = (user: User) => {
        if (window.confirm(`Are you sure you want to delete the user ${user.name}?`)) {
            deleteUser(user.id as number, parameters);
        }
    };

    return (
        <>
            <h1 className="page-title">Users</h1>
            <Link className="btn btn-primary float-right" to="/user/add">Add new</Link>
            <SearchBox
                userTypes={userTypes}
                parameters={parameters}
                setSearchName={setSearchName}
                setSearchUsername={setSearchUsername}
                setSearchUserTypeId={setSearchUserTypeId}
                onSearch={onSearch}
            />
            <SearchResults
                results={results}
                resultsLoading={resultsLoading}
                onDelete={onDelete}
                deletingId={deletingId}
            />
        </>
    );
}    

export default connect(
    (state: State) => ({ ...state.user.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
