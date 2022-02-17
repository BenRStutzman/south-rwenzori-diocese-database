import React from 'react';
import { Spinner } from "reactstrap";

interface Props {
    fullPage?: boolean;
    onTable?: boolean;
}

const LoadingSpinner = ({ fullPage, onTable }: Props) =>
    <div className={`loading-spinner-container${fullPage ? ' full-page' : onTable ? ' on-table' : ''}`}>
        <Spinner />
    </div>;

export default LoadingSpinner;
