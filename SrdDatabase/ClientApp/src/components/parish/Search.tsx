import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/search';
import { Parish } from '../../store/parish';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

type Props = Store.State & typeof Store.actionCreators & RouteComponentProps;

const Search = ({ parishes, history, loadParishes, deleteParish }: Props) => {
    const loadData = () => { loadParishes() };

    useEffect(loadData, []);

    const addParish = () => history.push(`/parish/add`);

    const editParish = (parishId: number) => history.push(`/parish/edit/${parishId}`);

    return (
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
                                <button className="btn btn-danger"onClick={() => { deleteParish(parish.id as number); }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}    

export default connect(
    (state: State) => state.parish.home,
    Store.actionCreators
)(Search as any);
