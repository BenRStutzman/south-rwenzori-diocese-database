import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/Home';
import { Archdeaconry } from '../../store/archdeaconries/Archdeaconry';
import { useEffect } from 'react';

type Props = Store.State & typeof Store.actionCreators

const Home = ({ archdeaconries, loadArchdeaconries }: Props) => {
    const loadData = () => { loadArchdeaconries() };

    useEffect(loadData, []);

    return (
        <>
            <h1 id="tabelLabel">Archdeaconries</h1>
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
                            <td><a href={`archdeaconry/edit/${archdeaconry.id}`}>Edit</a></td>
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
