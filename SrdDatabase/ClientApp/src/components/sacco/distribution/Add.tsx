import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../../store/sacco/distribution/save';
import { State } from '../../../store';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import LoadingSpinner from '../../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    isLoading,
    prefillDistribution,
}: Props) => {
    const loadData = () => {
        prefillDistribution();
    };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Distribution</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.sacco.distribution.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
