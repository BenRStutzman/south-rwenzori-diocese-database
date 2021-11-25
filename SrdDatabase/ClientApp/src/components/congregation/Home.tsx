import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/home';
import * as SharedStore from '../../store/shared';
import { Congregation } from '../../store/congregation';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const Home = ({
    congregationsLoading,
    congregations,
    archdeaconries,
    parishes,
    loadCongregations,
    loadArchdeaconries,
    loadParishes,
    setSearchName,
    deleteCongregation,
    deletingId,
}: Props) => {
    const loadData = () => { loadCongregations(); };

    useEffect(loadData, []);

    const onSearch = () => {
        loadCongregations();
    };

    const onDelete = (congregation: Congregation) => {
        if (window.confirm(`Are you sure you want to delete ${congregation.name} Congregation?`)) {
            deleteCongregation(congregation.id as number);
        }
    };

    return congregationsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Congregations</h1>
            <Link className="btn btn-primary float-right" to="/congregation/add">Add new</Link>
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
        </>;
};

export default connect(
    (state: State) => state.congregation.home,
    Store.actionCreators
)(Home as any);
