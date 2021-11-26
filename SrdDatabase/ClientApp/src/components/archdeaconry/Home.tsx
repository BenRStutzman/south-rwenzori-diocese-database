import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import * as SharedStore from '../../store/shared';
import { Archdeaconry } from '../../store/archdeaconry';
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
    results,
    resultsLoading,
    searchArchdeaconries,
    deleteArchdeaconry,
    deletingArchdeaconryId,
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
        deleteArchdeaconry(archdeaconry, () => { searchArchdeaconries(false, parameters); });
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
                deletingArchdeaconryId={deletingArchdeaconryId}
             />
        </>);
}    

export default connect(
    (state: State) => ({ ...state.archdeaconry.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
