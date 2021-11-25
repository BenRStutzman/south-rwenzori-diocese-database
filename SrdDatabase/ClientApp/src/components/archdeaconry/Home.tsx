import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import { Archdeaconry } from '../../store/archdeaconry/shared';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    archdeaconries,
    archdeaconriesLoading,
    searchArchdeaconries,
    deleteArchdeaconry,
    deletingId,
    setSearchName,
    searchParameters,
    resetSearchParameters,

}: Props) => {
    const loadData = () => {
        resetSearchParameters();
        searchArchdeaconries();
    };

    useEffect(loadData, []);

    const onSearch = () => {
        searchArchdeaconries(true, searchParameters);
    };

    const onDelete = (archdeaconry: Archdeaconry) => {
        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            deleteArchdeaconry(archdeaconry.id as number, searchParameters);
        }
    };

    return (
        <>
            <h1 className="page-title">Archdeaconries</h1>
            <Link className="btn btn-primary float-right" to="/archdeaconry/add">Add new</Link>
            <SearchBox
                onSearch={onSearch}
                updateName={setSearchName}
                parameters={searchParameters}
            />
            <SearchResults
                archdeaconries={archdeaconries}
                archdeaconriesLoading={archdeaconriesLoading}
                onDelete={onDelete}
                deletingId={deletingId}
             />
        </>);
}    

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(Home as any);
