import React from "react";
import { PagedParameters } from "../../models/shared";

interface Props {
    parameters: PagedParameters,
    columnName: string,
    onSort: (sortColumn?: string, sortDescending?: boolean) => void;
}

const Paging = ({
    parameters,
    columnName,
    onSort,
}: Props) => {
    const sortDirection = parameters.sortColumn !== columnName ? 'none' :
        parameters.sortDescending ? 'descending' : 'ascending';

    const onClick = () => {
        let sortColumn;
        let sortDescending;

        switch (sortDirection) {
            case 'none':
                sortColumn = columnName;
                sortDescending = false;
                break;
            case 'ascending':
                sortColumn = columnName;
                sortDescending = true;
                break;
            case 'descending':
                sortColumn = undefined;
                sortDescending = undefined;
                break;
        }

        onSort(sortColumn, sortDescending);
    }

    return (
        <button className="btn sort-button shadow-none" onClick={onClick}>
            <i className={`bi bi-caret-up${sortDirection === 'ascending' ? '-fill' : ''}`}></i>
            <i className={`bi bi-caret-down${sortDirection === 'descending' ? '-fill' : ''}`}></i>
        </button>
    );
}

export default Paging;