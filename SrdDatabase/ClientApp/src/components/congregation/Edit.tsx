import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ congregationId: string }>;

const Edit = ({
    loadCongregation,
    congregation,
    match,
    history,
    deleteCongregation,
    congregationLoading,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteCongregation(congregation, () => { history.push('/congregation'); });
    };

    return congregationLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {congregation.name} Congregation</h1>
            <div className="float-right button-group">
                <Link className="btn btn-secondary float-right" to={`/congregation/details/${congregation.id}`}>
                    View details
                </Link>
                <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                    Delete congregation
                </button>
            </div>
            <SaveForm submitWord="Update" />
        </>;
}

export default connect(
    (state: State) => state.congregation.save,
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Edit as any);
