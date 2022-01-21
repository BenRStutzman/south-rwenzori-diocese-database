import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../helpers/miscellaneous';
import * as Store from '../../store/parish/save';
import LoadingSpinner from '../shared/LoadingSpinner';
import SaveForm from './partials/SaveForm';
import { State } from '../../store';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    parishLoading,
    resetParish,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        const archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        resetParish(archdeaconryId);
    };

    useEffect(loadData, []);

    return parishLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Parish</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.parish.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch),
)(Add);
