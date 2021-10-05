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

const Save = ({ archdeaconry, updateArchdeaconryName, loadArchdeaconry, saveArchdeaconry, match }: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    const onSubmit = () => {
        saveArchdeaconry(archdeaconry as Archdeaconry);
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateArchdeaconryName(event.target.value);
    }

    useEffect(loadData, []);

    return (
        <>
            <h1 id="tabelLabel">Archdeaconry</h1>
            {archdeaconry &&
                <form onSubmit={onSubmit}>
                    <label>
                        Name:
                        <input type="text" value={archdeaconry.name} onChange={onNameChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            }
        </>
    );
}

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Save as any);
