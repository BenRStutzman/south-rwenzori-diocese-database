import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/home';
import { Congregation } from '../../store/congregation';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props = Store.State & typeof Store.actionCreators & RouteComponentProps;

const Home = ({
    congregationsLoading,
    congregations,
    history,
    loadCongregations,
    deleteCongregation }: Props) => {
    const loadData = () => { loadCongregations() };

    useEffect(loadData, []);

    const addCongregation = () => history.push(`/congregation/add`);

    const editCongregation = (congregationId: number) => history.push(`/congregation/edit/${congregationId}`);

    return congregationsLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Congregations</h1>
            <button className="btn btn-primary float-right" onClick={addCongregation}>Add new</button>
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
                                <button className="btn btn-secondary"onClick={() => { editCongregation(congregation.id as number); }}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger"onClick={() => { deleteCongregation(congregation.id as number); }}>
                                    Delete
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
