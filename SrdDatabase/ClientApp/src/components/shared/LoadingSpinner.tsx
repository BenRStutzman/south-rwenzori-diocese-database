import React from 'react';
import { Spinner } from "reactstrap";

interface Props {
    fullPage?: boolean;
}

const LoadingSpinner = ({ fullPage }: Props) =>
    <div className={`loading-spinner-container${fullPage ? ' full-page' : ''}`}>
        <Spinner />
    </div>;

export default LoadingSpinner;
