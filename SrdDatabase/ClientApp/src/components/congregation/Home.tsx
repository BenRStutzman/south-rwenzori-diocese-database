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
    parameters,
    searchCongregations,
    loadArchdeaconries,
    loadParishes,
    resetParameters,
    setSearchName,
    setSearchArchdeaconryId,
    setSearchParishId,
    deleteCongregation,
    deletingId,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        loadParishes();
        searchCongregations();
    };

    useEffect(loadData, []);

    const onSearch = () => {
        searchCongregations(true, parameters);
    };

    const onDelete = (congregation: Congregation) => {
        deleteCongregation(congregation, () => { searchCongregations(false, parameters); })
    };

    return (
        <>
            <h1 className="page-title">Congregations</h1>
            <Link className="btn btn-primary float-right" to="/congregation/add">Add new</Link>
            <SearchBox
                archdeaconries={archdeaconries}
                parishes={parishes}
                onSearch={onSearch}
                setSearchName={setSearchName}
                setSearchArchdeaconryId={setSearchArchdeaconryId}
                setSearchParishId={setSearchParishId}
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
};

export default connect(
    (state: State) => ({ ...state.congregation.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
