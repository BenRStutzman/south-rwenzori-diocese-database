import React from 'react';
import { Spinner } from 'reactstrap';

interface Props {
    onClear: () => any;
    searching: boolean;
    thingsBeingSearched: string;
}

const SearchButtons = ({
    onClear,
    thingsBeingSearched,
    searching,
}: Props) =>
    <div className="search-buttons">
        <button disabled={searching} className="btn btn-success" type="submit">
            {searching ? <Spinner size="sm" /> : `Search ${thingsBeingSearched}`}
        </button>
        <button
            className="btn btn-secondary" type="button" onClick={onClear}>
            Clear search options
        </button>
    </div>;

export default SearchButtons;
