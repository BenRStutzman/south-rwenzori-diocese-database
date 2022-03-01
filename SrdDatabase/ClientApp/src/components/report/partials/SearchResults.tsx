import React from 'react';
import LoadingSpinner from '../../shared/LoadingSpinner';
import * as Store from '../../../store/report/';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

type Props = Store.State;

const SearchResults = ({
    reportLoading,
    report,
}: Props) => {
    return reportLoading ? <LoadingSpinner /> : <div className="download-link-container">
        {
            report &&
            <CSVLink className="download-link" data={report.data} filename={report.fileName}>
                Download report
            </CSVLink>
        }
    </div>
}

export default connect(
    (state: State) => state.report
)(SearchResults);
