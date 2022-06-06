import { State } from '../../../../store';
import * as React from 'react';
import { ChangeEvent } from 'react';
import * as Store from '../../../../store/sacco/installment/save';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { convertDateChange, formattedDate, randomString } from '../../../../helpers/miscellaneous';

const autoComplete = randomString();

type Props =
    Store.State &
    typeof Store.actionCreators &
    RouteComponentProps;

const SaveForm = ({
    installment,
    saveInstallment,
    setReceiptNumber,
    setDatePaid,
    hasBeenChanged,
    errors,
    history,
    isSaving,
}: Props) => {
    const onDatePaidChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDatePaid(convertDateChange(event));
    };

    const onReceiptNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReceiptNumber(parseInt(event.target.value));
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        saveInstallment(installment, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="datePaid">Date Paid</label>
                <input
                    id="datePaid"
                    className="form-control"
                    type="date"
                    value={formattedDate(installment.datePaid)}
                    onChange={onDatePaidChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="receiptNumber">Receipt Number</label>
                <input
                    id="receiptNumber"
                    className="form-control"
                    type="number"
                    value={installment.receiptNumber?.toString() ?? ""}
                    onChange={onReceiptNumberChange}
                    autoComplete={autoComplete}
                    min={1}
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
                {isSaving ? <Spinner size="sm" /> : 'Update installment'}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State) => state.sacco.installment.save;

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(Store.actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));