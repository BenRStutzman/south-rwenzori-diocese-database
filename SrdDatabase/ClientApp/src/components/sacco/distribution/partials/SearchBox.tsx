import React, { ChangeEvent, useEffect } from 'react';
import { State } from '../../../../store';
import * as Store from '../../../../store/sacco/distribution/home';
import { connect } from 'react-redux';
import SearchButtons from '../../../shared/SearchButtons';
import { bindActionCreators } from 'redux';
import { convertDateChange } from '../../../../helpers/miscellaneous';

type OwnProps = {
    expanded: boolean;
}

type Props =
    OwnProps &
    Store.State &
    typeof Store.actionCreators;

const SearchBox = ({
    searchDistributions,
    parameters,
    setSearchStartDate,
    setSearchEndDate,
    prefillParameters,
    expanded,
}: Props) => {
    const loadData = () => {
        prefillParameters(true);
    };

    useEffect(loadData, []);

    const onStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchStartDate(convertDateChange(event));
    };

    const onEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEndDate(convertDateChange(event));
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        searchDistributions({ ...parameters, pageNumber: 0 });
    };

    return (
        <div hidden={!expanded} className="search-box">
            <form onSubmit={onSubmit}>
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
                    thingsBeingSearched="distributions"
                />
            </form>
        </div>
    );
}

export default connect(
    (state: State, ownProps: OwnProps) => ({
        ...state.sacco.distribution.home,
        ...ownProps,
    }),
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(SearchBox);