import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    items: DetailsListItem[];
    itemType: string;
}

interface DetailsListItem {
    id?: number;
    displayText?: string;
}

const DetailsList = ({
    title,
    items,
    itemType,
}: Props) =>
    <>
        <h2>{title} ({items.length})</h2>
        <ul>
            {items.map(item =>
                <li key={item.id}>{item.displayText}</li>
            )}
        </ul>
        <Link to={`/${itemType}`}>View more</Link>
    </>;

export default DetailsList;