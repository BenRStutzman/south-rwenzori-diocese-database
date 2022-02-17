import React from 'react';

interface Props {
    onClear: () => any;
    thingsBeingSearched: string;
}

const SearchButtons = ({
    onClear,
    thingsBeingSearched,
}: Props) =>
    <div className="search-buttons">
        <button className="btn btn-success" type="submit">
            Search {thingsBeingSearched}
        </button>
        <button className="btn btn-secondary" type="button" onClick={onClear}>
            Clear search options
        </button>
    </div>;

export default SearchButtons;
