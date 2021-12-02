import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Edit = ({ archdeaconryLoading,
    history,
    archdeaconry,
    loadArchdeaconry,
    deleteArchdeaconry,
    deletingArchdeaconryId,
    match,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = parseInt(match.params.archdeaconryId);
        loadArchdeaconry(archdeaconryId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteArchdeaconry(archdeaconry, () => { history.push('/archdeaconry'); });
    };

    return archdeaconryLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {archdeaconry.name} Archdeaconry</h1>
            <div className="button-group float-right">
                <Link className="btn btn-secondary float-right" to={`/archdeaconry/details/${archdeaconry.id}`}>
                    View details
                </Link>
                <button className='btn btn-danger float-right' type="button" onClick={onDelete}>
                    {archdeaconry.id === deletingArchdeaconryId ? <Spinner size="sm" /> : "Delete archdeaconry"}
                </button>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.archdeaconry.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
