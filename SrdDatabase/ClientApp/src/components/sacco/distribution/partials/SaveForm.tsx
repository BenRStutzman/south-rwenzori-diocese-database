import { State } from '../../../../store';
import * as React from 'react';
import { ChangeEvent } from 'react';
import * as Store from '../../../../store/sacco/distribution/save';
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
    distribution,
    saveDistribution,
    setPercentage,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
}: Props) => {
    const onPercentageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPercentage(parseFloat(event.target.value));
    };

    const onPercentageBlur = () => {
        setPercentage(parseFloat(distribution.percentage?.toFixed(2) ?? ''));
    }

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveDistribution(distribution, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="percentage">Percentage</label>
                <input
                    id="percentage"
                    className="form-control"
                    type="number"
                    value={distribution.percentage?.toString() ?? ""}
                    onChange={onPercentageChange}
                    onBlur={onPercentageBlur}
                    autoComplete={autoComplete}
                    min={0.01}
                    step=".01"
                    max={99.99}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    className="form-control"
                    type="date"
                    value={distribution.date ? new Date(distribution.date).toLocaleDateString('en-ca') : ''}
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
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} distribution`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.sacco.distribution.save,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Store.actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));