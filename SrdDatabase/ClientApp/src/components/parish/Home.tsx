import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/home';
import { Parish } from '../../store/parish';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    parishesLoading,
    parishes,
    loadParishes,
    deleteParish }: Props) => {
    const loadData = () => { loadParishes() };

    useEffect(loadData, []);

    const onDelete = (parish: Parish) => {
        if (window.confirm(`Are you sure you want to delete ${parish.name} Parish?`)) {
            deleteParish(parish.id as number);
        }
    };

    return parishesLoading ? <LoadingSpinner/> :
        <>
            <h1 className="page-title">Parishes</h1>
            <Link className="btn btn-primary float-right" to="/parish/add">Add new</Link>
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
    (state: State) => state.parish.home,
    Store.actionCreators
)(Home as any);
