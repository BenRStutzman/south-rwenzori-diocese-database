import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/parish/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ parishId: string }>;

const Edit = ({
    parishLoading,
    archdeaconriesLoading,
    history,
    parish,
    archdeaconries,
    setName,
    setArchdeaconryId,
    loadParish,
    loadArchdeaconries,
    saveParish,
    deleteParish,
    match,
    isSaving,
    hasBeenChanged,
    errors
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        const parishId = parseInt(match.params.parishId);
        loadParish(parishId);
    };

    useEffect(loadData, []);

    const onSave = () => {
        saveParish(parish, history);
    };

    const onDelete = () => {
        deleteParish(parish, () => { history.push('/parish'); });
    };

    return parishLoading || archdeaconriesLoading || isSaving ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {parish.name} Parish</h1>
            <Link className="btn btn-secondary float-right" to={`/parish/details/${parish.id}`}>
                View details
            </Link>
            <SaveForm
                parish={parish}
                archdeaconries={archdeaconries}
                setName={setName}
                updateParishArchdeaconryId={setArchdeaconryId}
                onSave={onSave}
                onDelete={onDelete}
                hasBeenChanged={hasBeenChanged}
                errors={errors}
                parishExists={true}
            />
        </>;
}

export default connect(
    (state: State) => ({ ...state.parish.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
