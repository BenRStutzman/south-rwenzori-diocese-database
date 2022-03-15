import React, { useEffect, useRef, useState } from 'react';
import * as Store from '../../../store/report/';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import LoadingSpinner from '../../shared/LoadingSpinner';

type Props = Store.State;

const SearchResults = ({
    report,
    reportLoading,
    reportVersion,
}: Props) => {
    const btnRef = useRef<any>(null);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
        } else {
            btnRef.current?.click();
        }
    }, [reportVersion]);

    return reportLoading ? <LoadingSpinner /> : report ?
        <div className="report-link-container">
            <h1>Your report will download shortly.</h1>
            <CSVLink data={report.data} filename={report.fileName}>
                <span ref={btnRef} />
                Download again
            </CSVLink>
        </div>
        : <></>;
}

export default connect(
    (state: State) => state.report
)(SearchResults);
