import React, { ChangeEvent, useEffect } from 'react';
import { State } from '../../../../store';
import * as Store from '../../../../store/sacco/transaction/home';
import * as SharedStore from '../../../../store/sacco/shared';
import { connect } from 'react-redux';
import SearchButtons from '../../../shared/SearchButtons';
import { bindActionCreators } from 'redux';
import { convertDateChange, randomString, useQueryParams } from '../../../../helpers/miscellaneous';

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
    searchTransactions,
    parameters,
    setSearchMemberId,
    setSearchIsShares,
    setSearchIsContribution,
    setSearchStartDate,
    setSearchEndDate,
    setSearchReceiptNumber,
    members,
    prefillParameters,
    loadMembers,
    membersLoading,
    expanded,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadMembers();

        var memberIdString = queryParams.get('memberId');
        const memberId = memberIdString ? parseInt(memberIdString) : undefined;

        prefillParameters(memberId, true);
    };

    useEffect(loadData, []);

    const onMemberIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchMemberId(parseInt(event.target.value));
    };

    const onIsSharesChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchIsShares(event.target.value === 'either' ? undefined : event.target.value === 'shares');
    };

    const onIsContributionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchIsContribution(event.target.value === 'either' ? undefined : event.target.value === 'contribution');
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
        searchTransactions({ ...parameters, pageNumber: 0 });
    };

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-6">
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
                    <div className="col-6">
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
                            <input
                                name="isShares"
                                id="shares"
                                type="radio"
                                value="shares"
                                onChange={onIsSharesChange}
                                checked={parameters.isShares === true}
                            />
                            <label htmlFor="shares">Shares</label>
                            <input
                                name="isShares"
                                id="savings"
                                type="radio"
                                value="savings"
                                onChange={onIsSharesChange}
                                checked={parameters.isShares === false}
                            />
                            <label htmlFor="savings">Savings</label>
                            <input
                                name="isShares"
                                id="isShares-either"
                                type="radio"
                                value="either"
                                onChange={onIsSharesChange}
                                checked={parameters.isShares === undefined}
                            />
                            <label htmlFor="isShares-either">Any</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <input
                                name="isContribution"
                                id="contribution"
                                type="radio"
                                value="contribution"
                                onChange={onIsContributionChange}
                                checked={parameters.isContribution === true}
                            />
                            <label htmlFor="contribution">
                                {
                                    parameters.isShares
                                        ? 'Purchase'
                                        : parameters.isShares === false
                                            ? 'Contribution'
                                            : 'Purchase/Contribution'
                                }
                            </label>
                            <input
                                name="isContribution"
                                id="withdrawal"
                                type="radio"
                                value="withdrawal"
                                onChange={onIsContributionChange}
                                checked={parameters.isContribution === false}
                            />
                            <label htmlFor="withdrawal">
                                {
                                    parameters.isShares
                                        ? 'Sale'
                                        : parameters.isShares === false
                                            ? 'Withdrawal'
                                            : 'Sale/Withdrawal'
                                }
                            </label>
                            <input
                                name="isContribution"
                                id="isContribution-either"
                                type="radio"
                                value="either"
                                onChange={onIsContributionChange}
                                checked={parameters.isContribution === undefined}
                            />
                            <label htmlFor="isContribution-either">Any</label>
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
                    onClear={() => { prefillParameters(); }}
                    thingsBeingSearched="transactions"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.sacco.transaction.home,
        ...state.sacco.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);