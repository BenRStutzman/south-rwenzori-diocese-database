import { State } from '../../../store';
import * as React from 'react';
import { ChangeEvent, useEffect } from 'react';
import * as Store from '../../../store/transaction/save';
import * as SharedStore from '../../../store/shared';
import { RouteComponentProps, withRouter } from 'react-router';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { randomString } from '../../../helpers/miscellaneous';

const autoComplete = randomString();

interface OwnProps {
    isNew?: boolean;
}

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators &
    RouteComponentProps &
    OwnProps;

const SaveForm = ({
    transaction,
    archdeaconries,
    parishes,
    congregations,
    transactionTypes,
    saveTransaction,
    setTransactionTypeId,
    setArchdeaconryId,
    setParishId,
    setCongregationId,
    setAmount,
    loadArchdeaconries,
    loadTransactionTypes,
    setDate,
    hasBeenChanged,
    errors,
    isNew,
    history,
    isSaving,
    transactionTypesLoading,
    archdeaconriesLoading,
    parishesLoading,
    congregationsLoading,
}: Props) => {
    const loadData = () => {
        loadArchdeaconries();
        loadTransactionTypes();
    };

    useEffect(loadData, []);

    const onTransactionTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTransactionTypeId(parseInt(event.target.value));
    };

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setArchdeaconryId(parseInt(event.target.value));
    }

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setParishId(parseInt(event.target.value));
    }

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCongregationId(parseInt(event.target.value));
    };

    const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    };

    const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(event.target.value));
    };

    const onSubmit = (formTransaction: React.FormEvent) => {
        formTransaction.preventDefault();
        saveTransaction(transaction, history);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="transactionTypeId">Transaction Type</label>
                <select
                    id="transactionTypeId"
                    className="form-control"
                    value={transactionTypesLoading ? "" : transaction.transactionTypeId ?? ""}
                    onChange={onTransactionTypeIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {transactionTypesLoading ? 'Loading...' : '--- select a transaction type ---'}
                    </option>
                    {transactionTypes.map(transactionType =>
                        <option key={transactionType.id} value={transactionType.id}>
                            {transactionType.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="archdeaconryId">Archdeaconry</label>
                <select
                    id="archdeaconryId"
                    className="form-control"
                    value={archdeaconriesLoading ? "" : transaction.archdeaconryId ?? ""}
                    onChange={onArchdeaconryIdChange}
                    required
                >
                    <option key={0} value="" disabled>
                        {archdeaconriesLoading ? 'Loading...' : '--- select an archdeaconry ---'}
                    </option>
                    {archdeaconries.map(archdeaconry =>
                        <option key={archdeaconry.id} value={archdeaconry.id}>
                            {archdeaconry.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="parishId">Parish</label>
                <select
                    id="parishId"
                    className="form-control"
                    value={parishesLoading ? "" : transaction.parishId ?? ""}
                    onChange={onParishIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !transaction.archdeaconryId ? 'First select an archdeaconry above'
                            : parishesLoading ? 'Loading...'
                                : parishes.length === 0 ? 'No parishes available in the selected archdeaconry'
                                    : '--- select a parish ---'}</option>
                    {parishes.map(parish =>
                        <option key={parish.id} value={parish.id}>
                            {parish.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="congregationId">Congregation</label>
                <select
                    id="congregationId"
                    className="form-control"
                    value={congregationsLoading ? "" : transaction.congregationId ?? ""}
                    onChange={onCongregationIdChange}
                    required
                >
                    <option key={0} value="" disabled>{
                        !transaction.parishId ? 'First select a parish above'
                            : congregationsLoading ? 'Loading...'
                                : congregations.length === 0 ? 'No congregations available in the selected parish'
                                    : '-- - select a congregation ---'
                    }</option>
                    {congregations.map(congregation =>
                        <option key={congregation.id} value={congregation.id}>
                            {congregation.name}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount (UGX)</label>
                <input
                    id="amount"
                    className="form-control"
                    type="number"
                    value={transaction.amount ?? ""}
                    onChange={onAmountChange}
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
                    value={transaction.date ? new Date(transaction.date).toLocaleDateString('en-ca') : ''}
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
            <button disabled={!hasBeenChanged} className="btn btn-primary" type="submit">
                {isSaving ? <Spinner size="sm" /> : `${isNew ? 'Create' : 'Update'} transaction`}
            </button>
        </form>
    );
};

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    ...state.transaction.save,
    ...state.shared,
    ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    ...Store.actionCreators,
    ...SharedStore.actionCreators,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SaveForm));