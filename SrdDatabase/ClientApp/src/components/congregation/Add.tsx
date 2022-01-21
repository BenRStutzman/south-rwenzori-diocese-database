import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../helpers/miscellaneous';
import { State } from '../../store';
import * as Store from '../../store/congregation/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import SaveForm from './partials/SaveForm';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    congregationLoading,
    resetCongregation,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        const parishIdString = queryParams.get('parishId');
        const parishId = parishIdString ? parseInt(parishIdString) : undefined;

        const archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        resetCongregation(parishId, archdeaconryId);
    };

    useEffect(loadData, []);

    return congregationLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Congregation</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.congregation.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
