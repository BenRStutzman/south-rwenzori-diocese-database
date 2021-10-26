import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import { Archdeaconry } from '../../store/archdeaconry';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props = Store.State & typeof Store.actionCreators & RouteComponentProps;

const Home = ({
    archdeaconries,
    archdeaconriesLoading,
    history,
    loadArchdeaconries,
    deleteArchdeaconry }: Props) => {
    const loadData = () => { loadArchdeaconries() };

    useEffect(loadData, []);

    const addArchdeaconry = () => history.push(`/archdeaconry/add`);

    const editArchdeaconry = (archdeaconryId: number) => history.push(`/archdeaconry/edit/${archdeaconryId}`);

    return archdeaconriesLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Archdeaconries</h1>
            <button className="btn btn-primary float-right" onClick={addArchdeaconry}>Add new</button>
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
                                <button className="btn btn-secondary" onClick={() => { editArchdeaconry(archdeaconry.id as number); }}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => { deleteArchdeaconry(archdeaconry.id as number); }}>
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
