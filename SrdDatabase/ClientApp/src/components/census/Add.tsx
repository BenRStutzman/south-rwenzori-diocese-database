import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/census/save';
import SaveForm from './partials/SaveForm';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../helpers/miscellaneous';
import { State } from '../../store';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Add = ({
    isLoading,
    prefillCensus,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        var congregationIdString = queryParams.get('congregationId');
        const congregationId = congregationIdString ? parseInt(congregationIdString) : undefined;

        var parishIdString = queryParams.get('parishId');
        const parishId = parishIdString ? parseInt(parishIdString) : undefined;

        var archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        prefillCensus(congregationId, parishId, archdeaconryId);
    };

    useEffect(loadData, []);

    return isLoading ? <LoadingSpinner fullPage /> :
        <>
            <h1>Add Christian Count</h1>
            <SaveForm isNew />
        </>;
}

export default connect(
    (state: State) => state.census.save,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
