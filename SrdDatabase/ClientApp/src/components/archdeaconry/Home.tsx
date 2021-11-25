import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import { Archdeaconry } from '../../store/archdeaconry';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Search from './Search';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    archdeaconries,
    archdeaconriesLoading,
    searchArchdeaconries,
    deleteArchdeaconry,
    deletingId,
    setSearchName,
    searchParameters,

}: Props) => {
    const loadData = () => { searchArchdeaconries(); };

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
            <Search
                onSearch={onSearch}
                updateName={setSearchName}
                parameters={searchParameters}
            />
            {
                archdeaconriesLoading ? <LoadingSpinner /> :
                    !archdeaconries.length ? <h2>No results.</h2> :
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th className="col-10">Name</th>
                                    <th className="col-1"></th>
                                    <th className="col-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {archdeaconries.map((archdeaconry: Archdeaconry) =>
                                    <tr key={archdeaconry.id}>
                                        <td>{archdeaconry.name}</td>
                                        <td>
                                            <Link className="btn btn-secondary" to={`/archdeaconry/edit/${archdeaconry.id}`}>
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { onDelete(archdeaconry); }}>
                                                {archdeaconry.id === deletingId ? <Spinner size="sm" /> : "Delete"}
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
            }
        </>);
}    

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(Home as any);
