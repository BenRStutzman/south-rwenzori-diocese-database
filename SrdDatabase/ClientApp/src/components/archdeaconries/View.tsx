import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/View';
import { Archdeaconry } from '../../store/archdeaconries/Archdeaconries';
import { useEffect } from 'react';

type Props = Store.State & typeof Store.actionCreators

const View = ({ archdeaconries, loadArchdeaconries }: Props) => {
    const loadData = () => { loadArchdeaconries() };

    useEffect(loadData, []);

    return (
        <>
            <h1 id="tabelLabel">Archdeaconries</h1>
            <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
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
                            <td><a href={`archdeaconries/${archdeaconry.id}`}>Edit</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}    

export default connect(
    (state: State) => state.archdeaconries.view,
    Store.actionCreators
)(View as any);
