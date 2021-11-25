import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/home';
import { Congregation } from '../../store/congregation/shared';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    congregationsLoading,
    congregations,
    loadCongregations,
    deleteCongregation,
    deletingId,
}: Props) => {
    const loadData = () => { loadCongregations(); };

    useEffect(loadData, []);

    const onDelete = (congregation: Congregation) => {
        if (window.confirm(`Are you sure you want to delete ${congregation.name} Congregation?`)) {
            deleteCongregation(congregation.id as number);
        }
    };

    return congregationsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Congregations</h1>
            <Link className="btn btn-primary float-right" to="/congregation/add">Add new</Link>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-5">Name</th>
                        <th className="col-5">Parish</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {congregations.map((congregation: Congregation) =>
                        <tr key={congregation.id}>
                            <td>{congregation.name}</td>
                            <td>{congregation.parish}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/congregation/edit/${congregation.id}`}>
                                    Edit
                                </Link>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { onDelete(congregation); }}>
                                    {congregation.id === deletingId ? <Spinner size="sm" /> : "Delete"}
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;
};

export default connect(
    (state: State) => state.congregation.home,
    Store.actionCreators
)(Home as any);
