import React, { ChangeEvent, useEffect } from 'react';
import { convertDateChange, formattedDate, useQueryParams } from '../../../../helpers/miscellaneous';
import { State } from '../../../../store';
import * as Store from '../../../../store/sacco/report';
import * as SharedStore from '../../../../store/sacco/shared';
import { connect } from 'react-redux';
import SearchButtons from '../../../shared/SearchButtons';
import { bindActionCreators } from 'redux';

type OwnProps = {
    expanded: boolean;
}

type Props =
    OwnProps &
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchBox = ({
    loadReport,
    parameters,
    setMemberId,
    setStartDate,
    setEndDate,
    loadMembers,
    members,
    prefillParameters,
    membersLoading,
    expanded,
}: Props) => {
    const queryParams = useQueryParams();

    const loadData = () => {
        loadMembers();

        var generateReportString = queryParams.get('generateReport');
        const generateReport = Boolean(generateReportString);

        var memberIdString = queryParams.get('memberId');
        const memberId = memberIdString ? parseInt(memberIdString) : undefined;

        const today = new Date();
        const startOfThisYear = new Date(today.getFullYear(), 0);

        prefillParameters(memberId, startOfThisYear, today, generateReport);
    };

    useEffect(loadData, []);

    const onMemberIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setMemberId(parseInt(event.target.value));
    };

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(convertDateChange(event));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEndDate(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        loadReport(parameters);
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
                                required
                            >
                                <option key={0} value="" disabled>
                                    {membersLoading ? 'Loading...' : '--- select a member ---'}
                                </option>
                                {members.map(member =>
                                    <option key={member.id} value={member.id}>
                                        {`${member.accountNumber} - ${member.name}`}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-4">
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
                    <div className="col-4">
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
                    altSearchText="Generate report"
                    altClearText="Clear parameters"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.sacco.report,
        ...state.sacco.shared,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchBox);