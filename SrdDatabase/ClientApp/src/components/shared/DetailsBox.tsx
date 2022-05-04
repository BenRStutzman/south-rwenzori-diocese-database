import React from 'react';
import { Link } from 'react-router-dom';
import { plural } from 'pluralize';
import { camelCaseToTitleCase } from '../../helpers/miscellaneous';

interface Props {
    itemType?: string;
    itemValue?: string;
    itemId?: number;
    baseItemType?: string;
    altTitle?: string;
    altLink?: string;
    altLinkText?: string;
    isSacco?: boolean;
}

const DetailsBox = ({
    itemValue,
    baseItemType,
    itemType,
    itemId,
    altTitle,
    altLink,
    altLinkText,
    isSacco,
}: Props) => {
    const saccoPrefix = isSacco ? '/sacco' : '';

    return (
        <div className="details-box">
            {
                altTitle ? <h2>{altTitle}</h2> :
                    <h2>
                        {`${camelCaseToTitleCase(itemType as string)}: `}
                        {itemId ?
                            <Link to={`${saccoPrefix}/${itemType}/details/${itemId}`}>
                                {itemValue}
                            </Link>
                            : <span>{itemValue}</span>
                        }
                    </h2>
            }
            {
                itemId && baseItemType &&
                <Link to={`${saccoPrefix}/${baseItemType}?${itemType}Id=${itemId}`}>View all {plural(baseItemType)} in this {itemType}</Link>
            }
            {altLink && <Link to={altLink}>{altLinkText}</Link>}
        </div>
    );
}

export default DetailsBox;