import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/home';
import * as SharedStore from '../../store/parish/shared';
import { Parish } from '../../store/parish';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Search from './Search';

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
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
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

    return parishesLoading ? <LoadingSpinner/> :
        <>
            <h1 className="page-title">Parishes</h1>
            <Link className="btn btn-primary float-right" to="/parish/add">Add new</Link>
            <Search
                archdeaconries={archdeaconries}
                onSearch={onSearch}
                updateName={setSearchName}
                updateArchdeaconryId={setSearchArchdeaconryId}
                parameters={searchParameters}
            />
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-5">Name</th>
                        <th className="col-5">Archdeaconry</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {parishes.map((parish: Parish) =>
                        <tr key={parish.id}>
                            <td>{parish.name}</td>
                            <td>{parish.archdeaconry}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/parish/edit/${parish.id}`}>
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger"onClick={() => { onDelete(parish); }}>
                                    {parish.id === deletingId ? <Spinner size="sm" /> : 'Delete'}
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;
}    

export default connect(
    (state: State) => ({...state.parish.home, ...state.parish.shared}),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
