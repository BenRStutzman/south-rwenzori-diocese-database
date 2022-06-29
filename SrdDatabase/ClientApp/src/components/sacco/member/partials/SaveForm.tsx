import * as Store from '../../../../store/sacco/member/save';
import * as React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { State } from '../../../../store';
import { Spinner } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { convertDateChange, formattedDate, randomString } from '../../../../helpers/miscellaneous';

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
    setIsChurch,
    setDateJoined,
    setAccountNumber,
    hasBeenChanged,
    errors,
    history,
    isSaving,
}: Props) => {
    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onIsChurchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChurch(event.target.value === 'church');
    };

    const onAccountNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(parseInt(event.target.value));
    };

    const onDateJoinedChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDateJoined(convertDateChange(event));
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveMember(member, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
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
                <input
                    name="isChurch"
                    id="individual"
                    type="radio"
                    value="individual"
                    onChange={onIsChurchChange}
                    checked={member.isChurch === false}
                />
                <label htmlFor="individual">Individual</label>
                <input
                    name="isChurch"
                    id="church"
                    type="radio"
                    value="church"
                    onChange={onIsChurchChange}
                    checked={member.isChurch ?? false}
                />
                <label htmlFor="church">Church</label>
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
            <div className="form-group">
                <label htmlFor="dateJoined">Date Joined</label>
                <input
                    id="dateJoined"
                    className="form-control"
                    type="date"
                    value={formattedDate(member.dateJoined)}
                    onChange={onDateJoinedChange}
                    required
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