import { State } from '../../../../store';
import * as React from 'react';
import { ChangeEvent } from 'react';
import * as Store from '../../../../store/sacco/dividend/save';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { convertDateChange, randomString } from '../../../../helpers/miscellaneous';

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
    dividend,
    saveDividend,
    setPercentage,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
}: Props) => {
    const onPercentageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPercentage(parseInt(event.target.value));
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveDividend(dividend, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="percentage">Percentage</label>
                <input
                    id="percentage"
                    className="form-control"
                    type="number"
                    value={dividend.percentage?.toString() ?? ""}
                    onChange={onPercentageChange}
                    autoComplete={autoComplete}
                    min={1}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={dividend.date ? new Date(dividend.date).toLocaleDateString('en-ca') : ''}
                    onChange={onDateChange}
                    required
                />
            </div>
            {
                Object.values(errors).length > 0 &&
                <ul>
                    {Object.entries(errors).map(([fieldName, errorList]: [string, string[]]) =>
                        <li
                            className="error-alert"
                            key={fieldName}>
                            {errorList.join(" ")}
                        </li>
                    )}
                </ul>
            }
            <button disabled={!hasBeenChanged || isSaving} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} dividend`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.sacco.dividend.save,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Store.actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));