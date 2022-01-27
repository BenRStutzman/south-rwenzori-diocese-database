import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';
import { DetailsListItem } from '../../models/shared';
import { camelCaseToTitleCase } from '../../helpers/miscellaneous';

interface Props {
    itemType: string;
    itemTotal?: number;
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
            <h2>{altTitle ?? `${camelCaseToTitleCase(plural(itemType))} (${itemTotal})`}</h2>
            <ul>
                {items.map(item =>
                    <li key={item.altKey ?? item.id}>
                        <Link to={`/${item.altType ?? itemType}/details/${item.id}`}>
                            {item.displayText}
                        </Link>
                    </li>
                )}
                {
                    itemTotal &&
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