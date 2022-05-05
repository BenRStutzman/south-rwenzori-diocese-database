import React, { ChangeEvent, useEffect } from 'react';
import { State } from '../../../../store';
import * as Store from '../../../../store/sacco/loan/home';
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
    searchLoans,
    parameters,
    setSearchMemberId,
    setSearchLoanTypeId,
    setSearchStartDate,
    setSearchEndDate,
    members,
    loanTypes,
    prefillParameters,
    loadMembers,
    loadLoanTypes,
    membersLoading,
    loanTypesLoading,
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

    const onLoanTypeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSearchLoanTypeId(parseInt(event.target.value));
    };

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchStartDate(convertDateChange(event));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEndDate(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchLoans({ ...parameters, pageNumber: 0 });
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
                                        {`${member.id} - ${member.name}`}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                   <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="loanTypeId">Loan Type</label>
                            <select
                                id="loanTypeId"
                                className="form-control"
                                value={loanTypesLoading ? "" : parameters.loanTypeId ?? ""}
                                onChange={onLoanTypeIdChange}
                            >
                                <option key={0} value="">
                                    {loanTypesLoading ? 'Loading...' : 'Any loan type'}
                                </option>
                                {loanTypes.map(loanType =>
                                    <option key={loanType.id} value={loanType.id}>
                                        {`${loanType.id} - ${loanType.name}`}
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
                    onClear={() => { prefillParameters(); }}
                    thingsBeingSearched="loans"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.sacco.loan.home,
        ...state.sacco.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);