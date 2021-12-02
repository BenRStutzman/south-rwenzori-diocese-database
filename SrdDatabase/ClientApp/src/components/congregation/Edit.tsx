import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import * as SharedStore from '../../store/shared';
import { RouteComponentProps } from 'react-router';
import { useEffect } from 'react';
import SaveForm from './partials/SaveForm';
import { Link } from 'react-router-dom';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps<{ congregationId: string }>;

const Edit = ({
    loadCongregation,
    congregation,
    match,
    history,
    deleteCongregation,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteCongregation(congregation, () => { history.push('/congregation'); });
    };

    const onEditSuccess = () => {
        history.push('/congregation');
    }

    return (
        <>
            <h1 className="page-title">Edit {congregation.name} Congregation</h1>
            <Link className="btn btn-secondary float-right" to={`/congregation/details/${congregation.id}`}>
                View details
            </Link>
            <SaveForm
                submitWord="Update"
                onSaveSuccess={onEditSuccess}
            />
            <button className="btn btn-danger float-right" type="button" onClick={onDelete}>
                Delete congregation
            </button>
        </>
    );
}

export default connect(
    (state: State) => ({ ...state.congregation.save, ...state.shared }),
    { ...Store.actionCreators }
)(Edit as any);
