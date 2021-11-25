import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/home';
import * as SharedStore from '../../store/parish/shared';
import { Parish } from '../../store/parish/shared';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

type Props = Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators

const Home = ({
    archdeaconries,
    loadArchdeaconries,
    parishesLoading,
    parishes,
    searchParishes,
    deleteParish,
    deletingId,
    searchParameters,
    setSearchName,
    setSearchArchdeaconryId,
    resetSearchParameters,
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        resetSearchParameters();
        searchParishes();
    };

    useEffect(loadData, []);

    const onDelete = (parish: Parish) => {
        if (window.confirm(`Are you sure you want to delete ${parish.name} Parish?`)) {
            deleteParish(parish.id as number, searchParameters);
        }
    };

    const onSearch = () => {
        searchParishes(true, searchParameters);
    }

    return (
        <>
            <h1 className="page-title">Parishes</h1>
            <Link className="btn btn-primary float-right" to="/parish/add">Add new</Link>
            <SearchBox
                archdeaconries={archdeaconries}
                onSearch={onSearch}
                updateName={setSearchName}
                updateArchdeaconryId={setSearchArchdeaconryId}
                parameters={searchParameters}
            />
            <SearchResults
                parishes={parishes}
                parishesLoading={parishesLoading}
                onDelete={onDelete}
                deletingId={deletingId}
            />
        </>
    );
}    

export default connect(
    (state: State) => ({...state.parish.home, ...state.parish.shared}),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
