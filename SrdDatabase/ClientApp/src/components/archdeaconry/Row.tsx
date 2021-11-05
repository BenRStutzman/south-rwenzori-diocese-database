import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Archdeaconry } from '../../store/archdeaconry';

interface Props {
    archdeaconry: Archdeaconry;
    deleteArchdeaconry: (archdeaconryId: number) => void;
    isDeleting: boolean;
}

const Row = ({
    archdeaconry,
    deleteArchdeaconry,
    isDeleting,
}: Props) => {
    const onDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${archdeaconry.name} Archdeaconry?`)) {
            deleteArchdeaconry(archdeaconry.id as number);
        }
    };

    return (
        <tr key={archdeaconry.id}>
            <td>{archdeaconry.name}</td>
            <td>
                <Link className="btn btn-secondary" to={`/archdeaconry/edit/${archdeaconry.id}`}>
                    Edit
                </Link>
            </td>
            <td>
                <button className="btn btn-danger" onClick={onDelete}>
                    {isDeleting ? <Spinner size="sm" /> : "Delete"}
                </button>
            </td>
        </tr>
    );
};

export default Row;