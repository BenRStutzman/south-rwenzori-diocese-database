import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';
import { DetailsListItem } from '../../models/shared';
import { capitalize } from '../../helpers/miscellaneous';

interface Props {
    itemType: string;
    itemTotal: number;
    items: DetailsListItem[];
}

const DetailsList = ({
    itemType,
    itemTotal,
    items,
}: Props) =>
    <div className="details-box">
        <h2>{capitalize(plural(itemType))} ({itemTotal})</h2>
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