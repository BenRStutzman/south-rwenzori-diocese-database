import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';
import { DetailsListItem } from '../../models/shared';
import { capitalize } from '../../helpers/miscellaneous';

interface Props {
    itemType: string;
    itemTotal: number;
    items: DetailsListItem[];
    showAddLink?: boolean;
    addParams?: string;
    altTitle?: string;
}

const DetailsList = ({
    itemType,
    itemTotal,
    items,
    showAddLink,
    addParams,
    altTitle,
}: Props) =>
    <div className="details-box">
        <div>
            <h2>{altTitle ?? `${capitalize(plural(itemType))} (${itemTotal})`}</h2>
            <ul>
                {items.map(item =>
                    <li key={item.id}>
                        <Link to={`/${itemType}/details/${item.id}`}>
                            {item.displayText}
                        </Link>
                    </li>
                )}
                {
                    itemTotal > items.length &&
                    <li>... and {itemTotal - items.length} more</li>
                }
            </ul>
        </div>
        <div>
            <Link to={`/${itemType}`}>View all {plural(itemType)}</Link>
            {
                showAddLink &&
                <Link className="float-right" to={`/${itemType}/add${addParams ?? ''}`}>Add {itemType}</Link>
            }
        </div>
    </div>;

export default DetailsList;