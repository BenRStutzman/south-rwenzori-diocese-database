import React, { ChangeEvent, useEffect, useState } from 'react';
import { randomString } from '../../../helpers/miscellaneous';
import { State } from '../../../store';
import * as Store from '../../../store/transaction/home';
import * as SharedStore from '../../../store/shared';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { connect } from 'react-redux';
import SearchButtons from '../../shared/SearchButtons';
import ExpandButton from '../../shared/ExpandButton';
import { bindActionCreators } from 'redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const autoCompleteString = randomString();

const SearchBox = ({
    searchTransactions,
    parameters,
    setSearchArchdeaconryId,
    setSearchParishId,
    setSearchCongregationId,
    setSearchTransactionTypeId,
    setSearchStartDate,
    setSearchEndDate,
    archdeaconries,
    parishes,
    congregations,
    transactionTypes,
    resetParameters,
    loadCongregations,
    loadTransactionTypes,
    loadArchdeaconries,
    loadParishes,
    congregationsLoading,
    transactionTypesLoading,
    resultsLoading,
    archdeaconriesLoading,
    parishesLoading,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        loadParishes();
        loadCongregations();
        loadTransactionTypes();
        searchTransactions();
    };

    useEffect(loadData, []);

    const [expanded, setExpanded] = useState(false);

    const onArchdeaconryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchArchdeaconryId(parseInt(event.target.value));
    };

    const onParishIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchParishId(parseInt(event.target.value));
    };

    const onCongregationIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchCongregationId(parseInt(event.target.value));
    };

    const onTransactionTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchTransactionTypeId(parseInt(event.target.value));
    };

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchStartDate(new Date(event.target.value));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEndDate(new Date(event.target.value));
    };

    const onSubmit = (transaction: React.FormEvent) => {
        transaction.preventDefault();
        searchTransactions(parameters);
    };

    return <>
        <ExpandButton expanded={expanded} setExpanded={setExpanded} />
        <div hidden={!expanded} className="search-box">
            {
                congregationsLoading || transactionTypesLoading || archdeaconriesLoading || parishesLoading ? <LoadingSpinner /> :
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="transactionTypeId">Transaction Type</label>
                                    <select
                                        id="transactionTypeId"
                                        className="form-control"
                                        value={parameters.transactionTypeId ?? ""}
                                        onChange={onTransactionTypeIdChange}
                                    >
                                        <option key={0} value="">Any transaction type</option>
                                        {transactionTypes.map(transactionType =>
                                            <option key={transactionType.id} value={transactionType.id}>
                                                {transactionType.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="congregationId">Congregation</label>
                                    <select
                                        id="congregationId"
                                        className="form-control"
                                        value={parameters.congregationId ?? ""}
                                        onChange={onCongregationIdChange}
                                    >
                                        <option key={0} value="">Any congregation</option>
                                        {congregations.map(congregation =>
                                            <option key={congregation.id} value={congregation.id}>
                                                {congregation.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="parishId">Parish</label>
                                    <select
                                        id="parishId"
                                        className="form-control"
                                        value={parameters.parishId ?? ""}
                                        onChange={onParishIdChange}
                                    >
                                        <option key={0} value="">Any parish</option>
                                        {parishes.map(parish =>
                                            <option key={parish.id} value={parish.id}>
                                                {parish.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="archdeaconryId">Archdeaconry</label>
                                    <select
                                        id="archdeaconryId"
                                        className="form-control"
                                        value={parameters.archdeaconryId ?? ""}
                                        onChange={onArchdeaconryIdChange}
                                    >
                                        <option key={0} value="">Any archdeaconry</option>
                                        {archdeaconries.map(archdeaconry =>
                                            <option key={archdeaconry.id} value={archdeaconry.id}>
                                                {archdeaconry.name}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        id="startDate"
                                        className="form-control"
                                        type="date"
                                        value={parameters.startDate?.toLocaleDateString('en-ca') ?? ""}
                                        onChange={onStartDateChange}
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        id="endDate"
                                        className="form-control"
                                        type="date"
                                        value={parameters.endDate?.toLocaleDateString('en-ca') ?? ""}
                                        onChange={onEndDateChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <SearchButtons
                            searching={resultsLoading}
                            onClear={resetParameters}
                            thingsBeingSearched="transactions"
                        />
                    </form>
            }
        </div>
    </>;
}

export default connect(
    (state: State) => ({ ...state.transaction.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);