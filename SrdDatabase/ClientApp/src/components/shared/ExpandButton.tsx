import React from 'react';

interface Props {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

const ExpandButton = ({
    expanded,
    setExpanded,
}: Props) => (
    <div className="expand-button-container">
        <button
            className={`btn ${expanded ? 'btn-link' : 'btn-success'}`}
            type="button"
            onClick={() => { setExpanded(!expanded); }}>
            {expanded ? 'Hide' : 'Show'} search options
        </button>
    </div>
);

export default ExpandButton;