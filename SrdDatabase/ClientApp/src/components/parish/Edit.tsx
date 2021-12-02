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
import { Spinner } from 'reactstrap';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ parishId: string }>;

const Edit = ({
    parishLoading,
    history,
    parish,
    loadParish,
    deleteParish,
    match,
    deletingParishId,
}: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadParish(parishId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteParish(parish, () => { history.push('/parish'); });
    };

    return parishLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {parish.name} Parish</h1>
            <div className="float-right button-group">
                <Link className="btn btn-secondary float-right" to={`/parish/details/${parish.id}`}>
                    View details
                </Link>
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    {parish.id === deletingParishId ? <Spinner size="sm" /> : 'Delete parish'}
                </button>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.parish.save, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
