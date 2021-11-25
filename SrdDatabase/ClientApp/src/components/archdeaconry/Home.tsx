import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import { Archdeaconry } from '../../store/archdeaconry';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    results,
    resultsLoading,
    searchArchdeaconries,
    deleteArchdeaconry,
    deletingId,
    setSearchName,
    parameters,
    resetParameters,

}: Props) => {
    const loadData = () => {
        resetParameters();
        searchArchdeaconries();
    };

    useEffect(loadData, []);

    const onSearch = () => {
        searchArchdeaconries(true, parameters);
    };

    const onDelete = (archdeaconry: Archdeaconry) => {
        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            deleteArchdeaconry(archdeaconry.id as number, parameters);
        }
    };

    return (
        <>
            <h1 className="page-title">Archdeaconries</h1>
            <Link className="btn btn-primary float-right" to="/archdeaconry/add">Add new</Link>
            <SearchBox
                onSearch={onSearch}
                setSearchName={setSearchName}
                parameters={parameters}
            />
            <SearchResults
                results={results}
                resultsLoading={resultsLoading}
                onDelete={onDelete}
                deletingId={deletingId}
             />
        </>);
}    

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(Home as any);
