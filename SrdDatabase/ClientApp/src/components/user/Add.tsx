import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/user/save';
import { State } from '../../store';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    isLoading,
    prefillUser,
}: Props) => {
    const loadData = () => {
        prefillUser();
    };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add User</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.user.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
