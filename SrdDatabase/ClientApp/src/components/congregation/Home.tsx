import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/home';
import * as SharedStore from '../../store/shared';
import { Congregation } from '../../store/congregation';
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
    archdeaconries,
    parishes,
    searchParameters,
    searchCongregations,
    loadArchdeaconries,
    loadParishes,
    resetSearchParameters,
    setSearchName,
    setSearchArchdeaconryId,
    setSearchParishId,
    deleteCongregation,
    deletingId,
}: Props) => {
    const loadData = () => {
        resetSearchParameters();
        loadArchdeaconries();
        loadParishes();
        searchCongregations();
    };

    useEffect(loadData, []);

    const onSearch = () => {
        searchCongregations(true, searchParameters);
    };

    const onDelete = (congregation: Congregation) => {
        if (window.confirm(`Are you sure you want to delete ${congregation.name} Congregation?`)) {
            deleteCongregation(congregation.id as number, searchParameters);
        }
    };

    return (
        <>
            <h1 className="page-title">Congregations</h1>
            <Link className="btn btn-primary float-right" to="/congregation/add">Add new</Link>
            <SearchBox
                archdeaconries={archdeaconries}
                parishes={parishes}
                onSearch={onSearch}
                updateName={setSearchName}
                updateArchdeaconryId={setSearchArchdeaconryId}
                updateParishId={setSearchParishId}
                parameters={searchParameters}
            />
            <SearchResults
                results={results}
                resultsLoading={resultsLoading}
                onDelete={onDelete}
                deletingId={deletingId}
            />
        </>
    );
};

export default connect(
    (state: State) => ({ ...state.congregation.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
