import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/home';
import * as SharedStore from '../../store/shared';
import { Parish } from '../../store/parish';
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
    resultsLoading,
    results,
    searchParishes,
    deleteParish,
    deletingId,
    parameters,
    setSearchName,
    setSearchArchdeaconryId,
    resetParameters,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        searchParishes();
    };

    useEffect(loadData, []);

    const onDelete = (parish: Parish) => {
        if (window.confirm(`Are you sure you want to delete ${parish.name} Parish?`)) {
            deleteParish(parish.id as number, parameters);
        }
    };

    const onSearch = () => {
        searchParishes(true, parameters);
    }

    return (
        <>
            <h1 className="page-title">Parishes</h1>
            <Link className="btn btn-primary float-right" to="/parish/add">Add new</Link>
            <SearchBox
                archdeaconries={archdeaconries}
                onSearch={onSearch}
                setSearchName={setSearchName}
                setSearchArchdeaconryId={setSearchArchdeaconryId}
                parameters={parameters}
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
    (state: State) => ({...state.parish.home, ...state.shared}),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
