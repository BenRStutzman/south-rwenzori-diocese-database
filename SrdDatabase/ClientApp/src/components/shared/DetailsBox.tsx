import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';

interface Props {
    itemType: string;
    itemValue?: string;
    itemId?: number;
}

const DetailsBox = ({
    itemValue,
    itemType,
    itemId,
}: Props) =>
    <div className="details-box">
        <h2>
            {`${itemType[0].toUpperCase()}${itemType.substr(1)}: `}
            <Link to={`/${itemType}/details/${itemId}`}>
                {itemValue}
            </Link>
        </h2>
        <Link to={`/${itemType}`}>View all {plural(itemType)}</Link>
    </div>;

export default DetailsBox;