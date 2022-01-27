import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';
import { DetailsListItem } from '../../models/shared';
import { camelCaseToTitleCase } from '../../helpers/miscellaneous';

interface Props {
    viewAllEnding?: string;
    itemType: string;
    itemTotal?: number;
    items: DetailsListItem[];
    showAddLink?: boolean;
    addParams?: string;
    altTitle?: string;
    secondType?: string;
}

const DetailsList = ({
    itemType,
    viewAllEnding,
    itemTotal,
    items,
    showAddLink,
    addParams,
    altTitle,
    secondType,
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
            <div>
                <Link to={`/${itemType}${addParams ?? ''}`}>View all {plural(itemType)}{viewAllEnding ?? ''}</Link>
                {
                    showAddLink &&
                    <Link className="float-right" to={`/${itemType}/add${addParams ?? ''}`}>Add {itemType}</Link>
                }
            </div>
            {
                secondType &&
                <div>
                    <Link to={`/${secondType}${addParams ?? ''}`}>View all {plural(secondType)}{viewAllEnding ?? ''}</Link>
                    {
                        showAddLink &&
                        <Link className="float-right" to={`/${secondType}/add${addParams ?? ''}`}>Add {secondType}</Link>
                    }
                </div>
            }
        </div>
    </div>;

export default DetailsList;