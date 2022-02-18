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
import { bindActionCreators } from 'redux';

type Props =
    Store.State
    & typeof Store.actionCreators
    & SharedStore.State
    & typeof SharedStore.actionCreators
    & RouteComponentProps<{ parishId: string }>;

const Edit = ({
    isLoading,
    history,
    parish,
    loadParish,
    deleteParish,
    match,
    deletingParishIds,
}: Props) => {
    const loadData = () => {
        const parishId = parseInt(match.params.parishId);
        loadParish(parishId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteParish(parish, () => { history.push('/parish'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>Edit {parish.name} Parish</h1>
                <div className="float-right button-group">
                    <Link className="btn btn-secondary" to={`/parish/details/${parish.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingParishIds.includes(parish.id as number) ? <Spinner size="sm" /> : 'Delete parish'}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.parish.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
