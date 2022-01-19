import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useQueryParams } from '../../helpers/miscellaneous';
import * as Store from '../../store/parish/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators;

const Add = ({
    resetParish,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        const archdeaconryIdString = queryParams.get('archdeaconryId');
        const archdeaconryId = archdeaconryIdString ? parseInt(archdeaconryIdString) : undefined;

        resetParish(archdeaconryId);
    };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Parish</h1>
            <SaveForm isNew />
        </>
     );
}

export default connect(
    null,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch),
)(Add);
