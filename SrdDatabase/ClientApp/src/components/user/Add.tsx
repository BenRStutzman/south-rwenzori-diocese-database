import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Store from '../../store/user/save';
import SaveForm from './partials/SaveForm';

type Props =
    typeof Store.actionCreators;

const Add = ({
    resetUser,
}: Props) => {
    const loadData = () => {
        resetUser();
    };

    useEffect(loadData, []);

    return (
        <>
            <h1>Add User</h1>
            <SaveForm isNew />
        </>
    );
}

export default connect(
    null,
    Store.actionCreators
)(Add as any);
