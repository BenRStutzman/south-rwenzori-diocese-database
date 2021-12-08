import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';

interface Props {
    title: string;
    total: number;
    items: DetailsListItem[];
    itemType: string;
}

interface DetailsListItem {
    id?: number;
    displayText?: string;
}

const DetailsList = ({
    title,
    total,
    items,
    itemType,
}: Props) =>
    <div className="details-box">
        <h2>{title} ({total})</h2>
        <ul>
            {items.map(item =>
                <li key={item.id}>
                    <Link to={`/${itemType}/details/${item.id}`}>
                        {item.displayText}
                    </Link>
                </li>
            )}
        </ul>
        <Link to={`/${itemType}`}>View all {plural(itemType)}</Link>
    </div>;

export default DetailsList;