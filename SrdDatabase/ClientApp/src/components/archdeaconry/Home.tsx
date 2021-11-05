import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import { Archdeaconry } from '../../store/archdeaconry';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    archdeaconries,
    archdeaconriesLoading,
    loadArchdeaconries,
    deleteArchdeaconry }: Props) => {
    const loadData = () => { loadArchdeaconries() };

    useEffect(loadData, []);

    const onDelete = (archdeaconry: Archdeaconry) => {
        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            deleteArchdeaconry(archdeaconry.id as number);
        }
    };

    return archdeaconriesLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Archdeaconries</h1>
            <Link className="btn btn-primary float-right" to="/archdeaconry/add">Add new</Link>
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
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;
}    

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(Home as any);
