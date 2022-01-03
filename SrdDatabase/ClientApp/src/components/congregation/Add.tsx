import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import * as Store from '../../store/congregation/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators &
    RouteComponentProps<{ parishId: string }>;

const Add = ({
    resetCongregation,
    match,
}: Props) => {
    const loadData = () => {
        const parishId = match.params.parishId ? parseInt(match.params.parishId) : undefined;
        resetCongregation(parishId);
    };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add Congregation</h1>
            <SaveForm isNew />
        </>
    );
}

export default connect(
    null,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Add);
