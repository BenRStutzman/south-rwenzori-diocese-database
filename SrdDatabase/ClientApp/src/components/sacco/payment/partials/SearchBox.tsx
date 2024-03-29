﻿import React, { ChangeEvent, useEffect } from 'react';
import { State } from '../../../../store';
import * as Store from '../../../../store/sacco/payment/home';
import * as SharedStore from '../../../../store/sacco/shared';
import { connect } from 'react-redux';
import SearchButtons from '../../../shared/SearchButtons';
import { bindActionCreators } from 'redux';
import { convertDateChange, formattedDate, randomString, useQueryParams } from '../../../../helpers/miscellaneous';
import { describeLoan } from '../../../../helpers/sacco/loanHelper';

type OwnProps = {
    expanded: boolean;
}

type Props =
    OwnProps &
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const autoCompleteString = randomString();

const SearchBox = ({
    searchPayments,
    parameters,
    setSearchMemberId,
    setSearchLoanId,
    setSearchStartDate,
    setSearchEndDate,
    setSearchReceiptNumber,
    members,
    loans,
    prefillParameters,
    loadMembers,
    membersLoading,
    loansLoading,
    expanded,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadMembers();

        var memberIdString = queryParams.get('memberId');
        const memberId = memberIdString ? parseInt(memberIdString) : undefined;

        var loanIdString = queryParams.get('loanId');
        const loanId = loanIdString ? parseInt(loanIdString) : undefined;

        prefillParameters(loanId, memberId, true);
    };

    useEffect(loadData, []);

    const onMemberIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchMemberId(parseInt(event.target.value));
    };

    const onLoanIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchLoanId(parseInt(event.target.value));
    };

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchStartDate(convertDateChange(event));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEndDate(convertDateChange(event));
    };

    const onReceiptNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchReceiptNumber(parseInt(event.target.value));
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchPayments({ ...parameters, pageNumber: 0 });
    };

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="memberId">Member</label>
                            <select
                                id="memberId"
                                className="form-control"
                                value={membersLoading ? "" : parameters.memberId ?? ""}
                                onChange={onMemberIdChange}
                            >
                                <option key={0} value="">
                                    {membersLoading ? 'Loading...' : 'Any member'}
                                </option>
                                {members.map(member =>
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="loanId">Loan</label>
                            <select
                                id="loanId"
                                className="form-control"
                                value={loansLoading ? "" : parameters.loanId ?? ""}
                                onChange={onLoanIdChange}
                            >
                                <option key={0} value="">
                                    {loansLoading ? 'Loading...' : 'Any loan'}
                                </option>
                                {loans.map(loan =>
                                    <option key={loan.id} value={loan.id}>
                                        {describeLoan(loan, true, true)}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label htmlFor="receiptNumber">Receipt Number</label>
                            <input
                                id="receiptNumber"
                                className="form-control"
                                autoComplete={autoCompleteString}
                                type="number"
                                value={parameters.receiptNumber?.toString() ?? ""}
                                onChange={onReceiptNumberChange}
                                min={1}
                            />
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
                                value={formattedDate(parameters.startDate)}
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
                                value={formattedDate(parameters.endDate)}
                                onChange={onEndDateChange}
                            />
                        </div>
                    </div>
                </div>
                <SearchButtons
                    onClear={() => { prefillParameters(); }}
                    thingsBeingSearched="payments"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.sacco.payment.home,
        ...state.sacco.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);