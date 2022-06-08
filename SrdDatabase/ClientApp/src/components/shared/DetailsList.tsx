import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';
import { DetailsListItem } from '../../models/shared';
import { camelCaseToTitleCase } from '../../helpers/miscellaneous';

interface Props {
    itemType: string;
    baseItemType?: string;
    baseItemId?: number;
    itemTotal?: number;
    items: DetailsListItem[];
    showAddLink?: boolean;
    isSacco?: boolean;
    altTitle?: string;
    altPreposition?: string;
    dontLinkItems?: boolean;
    dontViewAll?: boolean;
}

const DetailsList = ({
    itemType,
    baseItemType,
    baseItemId,
    itemTotal,
    items,
    showAddLink,
    dontLinkItems,
    dontViewAll,
    isSacco,
    altTitle,
    altPreposition,
}: Props) => {

    const addParams = baseItemType && baseItemId ? `?${baseItemType}Id=${baseItemId}` : undefined;
    const saccoPrefix = isSacco ? '/sacco' : '';
    const preposition = altPreposition ?? 'in';

    return (
        <div className="details-box">
            <div>
                <h2>{altTitle ?? `${camelCaseToTitleCase(plural(itemType))}: ${itemTotal?.toLocaleString()}`}</h2>
                <ul>
                    {items.map(item =>
                        <li key={item.id}>
                            {
                                dontLinkItems ? item.displayText :
                                    <Link to={`${saccoPrefix}/${itemType}/details/${item.id}`}>
                                        {item.displayText}
                                    </Link>
                            }
                        </li>
                    )}
                    {
                        itemTotal !== undefined &&
                        itemTotal > items.length &&
                        <li>...and {itemTotal - items.length} more</li>
                    }
                </ul>
            </div>
            <div>
                <div>
                    {
                        !dontViewAll &&
                        <Link to={`${saccoPrefix}/${itemType}${addParams ?? ''}`}>View all {plural(itemType)}{baseItemType ? ` ${preposition} this ${baseItemType}` : ''}</Link>
                    }
                    {
                        showAddLink &&
                        <Link className="float-right" to={`${saccoPrefix}/${itemType}/add${addParams ?? ''}`}>Add {itemType}</Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default DetailsList;