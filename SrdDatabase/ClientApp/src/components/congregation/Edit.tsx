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
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';

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
    isLoading,
    deleteCongregation,
    deletingCongregationIds,
    history,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    const onDelete = () => {
        deleteCongregation(congregation, () => { history.push('/congregation'); });
    };

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <div className="page-heading">
                <h1>Edit {congregation.name} Congregation</h1>
                <div className="button-group float-right">
                    <Link className="btn btn-secondary" to={`/congregation/details/${congregation.id}`}>
                        View details
                    </Link>
                    <button className="btn btn-danger" type="button" onClick={onDelete}>
                        {deletingCongregationIds.includes(congregation.id as number) ? <Spinner size="sm" /> : "Delete congregation"}
                    </button>
                </div>
            </div>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => ({ ...state.congregation.save, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
