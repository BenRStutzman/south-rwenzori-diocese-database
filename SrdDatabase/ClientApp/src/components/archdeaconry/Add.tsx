import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import SaveForm from './partials/SaveForm';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    resetArchdeaconry,
    archdeaconryLoading,
}: Props) => {
    const loadData = () => { resetArchdeaconry(); };

    useEffect(loadData, []);

    return archdeaconryLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Archdeaconry</h1>
            <SaveForm isNew />
        </>;
};

export default connect(
    (state: State) => state.archdeaconry.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
