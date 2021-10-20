import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/search';
import { Archdeaconry } from '../../store/archdeaconries/archdeaconry';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

type Props = Store.State & typeof Store.actionCreators & RouteComponentProps;

const Home = ({ archdeaconries, history, loadArchdeaconries, deleteArchdeaconry }: Props) => {
    const loadData = () => { loadArchdeaconries() };

    useEffect(loadData, []);

    const addArchdeaconry = () => history.push(`/archdeaconry/add`);

    const editArchdeaconry = (archdeaconryId: number) => history.push(`/archdeaconry/edit/${archdeaconryId}`);

    return (
        <>
            <h1>Archdeaconries</h1>
            <button onClick={addArchdeaconry}>Add new</button>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {archdeaconries.map((archdeaconry: Archdeaconry) =>
                        <tr key={archdeaconry.id}>
                            <td>{archdeaconry.id}</td>
                            <td>{archdeaconry.name}</td>
                            <td>
                                <button onClick={() => { editArchdeaconry(archdeaconry.id as number); }}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button onClick={() => { deleteArchdeaconry(archdeaconry.id as number); }}>
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
    (state: State) => state.archdeaconries.home,
    Store.actionCreators
)(Home as any);
