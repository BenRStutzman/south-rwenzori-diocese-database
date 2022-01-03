import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import * as Store from '../../store/parish/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators &
    RouteComponentProps<{ archdeaconryId: string }>;

const Add = ({
    resetParish,
    match,
}: Props) => {
    const loadData = () => {
        const archdeaconryId = match.params.archdeaconryId ? parseInt(match.params.archdeaconryId) : undefined;
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
