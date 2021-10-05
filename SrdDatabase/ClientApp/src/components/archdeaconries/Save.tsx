import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/Save';
import { RouteComponentProps } from 'react-router';
import { Archdeaconry } from '../../store/archdeaconries/Archdeaconries';
import { useEffect } from 'react';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ archdeaconryId: string }>;

const Save = ({ archdeaconry, loadArchdeaconry, saveArchdeaconry, match }: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    return (
        <>
            <h1 id="tabelLabel">Archdeaconry</h1>
            {archdeaconry &&
                <>
                    <Table archdeaconry={archdeaconry} />
                    <button type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => { saveArchdeaconry(archdeaconry); }}>
                        Heeeyo
                        </button>
                </>
            }
        </>
    );
}

const Table = ({ archdeaconry }: { archdeaconry: Archdeaconry }) =>
    <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr key={archdeaconry.id}>
                <td>{archdeaconry.id}</td>
                <td>{archdeaconry.name}</td>
            </tr>
        </tbody>
    </table>;

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Save as any);
