import React from 'react';

interface Props {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

const ExpandButton = ({
    expanded,
    setExpanded,
}: Props) =>
    <button
        className={`expand-button shadow-none btn ${expanded ? 'expand-button-expanded btn-link' : 'btn-success'}`}
        type="button"
        onClick={() => { setExpanded(!expanded); }}>
        {expanded ? 'Hide' : 'Show'} search options
    </button>;

export default ExpandButton;