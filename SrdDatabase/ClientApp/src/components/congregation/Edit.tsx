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
    congregationLoading,
}: Props) => {
    const loadData = () => {
        const congregationId = parseInt(match.params.congregationId);
        loadCongregation(congregationId);
    };

    useEffect(loadData, []);

    return congregationLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Edit {congregation.name} Congregation</h1>
            <Link className="btn btn-secondary float-right" to={`/congregation/details/${congregation.id}`}>
                View details
            </Link>
            <SaveForm />
        </>;
}

export default connect(
    (state: State) => state.congregation.save,
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(Edit);
