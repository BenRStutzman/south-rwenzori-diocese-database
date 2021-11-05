import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/home';
import { Parish } from '../../store/parish';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props = Store.State & typeof Store.actionCreators & RouteComponentProps;

const Home = ({
    parishesLoading,
    parishes,
    history,
    loadParishes,
    deleteParish }: Props) => {
    const loadData = () => { loadParishes() };

    useEffect(loadData, []);

    const addParish = () => history.push(`/parish/add`);

    const editParish = (parishId: number) => history.push(`/parish/edit/${parishId}`);

    const onDelete = (parish: Parish) => {
        if (window.confirm(`Are you sure you want to delete ${parish.name} Parish?`)) {
            deleteParish(parish.id as number);
        }
    };

    return parishesLoading ? <LoadingSpinner/> :
        <>
            <h1 className="page-title">Parishes</h1>
            <button className="btn btn-primary float-right" onClick={addParish}>Add new</button>
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
                                <button className="btn btn-secondary"onClick={() => { editParish(parish.id as number); }}>
                                    Edit
                                </button>
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
