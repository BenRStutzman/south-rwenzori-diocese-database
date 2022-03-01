import React from 'react';

interface Props {
    onClear: () => any;
    thingsBeingSearched?: string;
    altSearchText?: string;
    altClearText?: string;
}

const SearchButtons = ({
    onClear,
    thingsBeingSearched,
    altSearchText,
    altClearText,
}: Props) =>
    <div className="search-buttons">
        <button className="btn btn-success" type="submit">
            {altSearchText ?? `Search${thingsBeingSearched ? ` ${thingsBeingSearched}` : ''}`}
        </button>
        <button className="btn btn-secondary" type="button" onClick={onClear}>
            {altClearText ?? 'Clear search options'}
        </button>
    </div>;

export default SearchButtons;
