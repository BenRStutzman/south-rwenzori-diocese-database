import * as Store from '../../../../store/sacco/member/save';
import * as React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { State } from '../../../../store';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { randomString } from '../../../../helpers/miscellaneous';

const autoComplete = randomString();

interface OwnProps {
    isNew?: boolean;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    isNew,
    member,
    saveMember,
    setName,
    setAccountNumber,
    hasBeenChanged,
    errors,
    history,
    isSaving,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onAccountNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(parseInt(event.target.value));
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveMember(member, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="accountNumber">Account number</label>
                <input
                    id="accountNumber"
                    className="form-control"
                    type="number"
                    autoComplete={autoComplete}
                    value={member.accountNumber ?? ""}
                    onChange={onAccountNumberChange}
                    required
                    min={1}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    spellCheck={false}
                    autoComplete={autoComplete}
                    value={member.name ?? ""}
                    onChange={onNameChange}
                    required
                    maxLength={50}
                />
            </div>
            {Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}</li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged || isSaving} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} member`}
            </button>
        </form>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({ ...state.sacco.member.save, ...ownProps }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(withRouter(SaveForm));