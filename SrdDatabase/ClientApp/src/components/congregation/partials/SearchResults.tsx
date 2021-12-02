﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import * as Store from '../../../store/congregation/home';
import * as SharedStore from '../../../store/shared';
import { atLeast } from '../../../helpers/userRole';
import { Congregation } from '../../../store/congregation';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { State } from '../../../store';
import { connect } from 'react-redux';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingId,
    deleteCongregation,
    searchCongregations,
    parameters,
    user,
}: Props) => {
    const canEdit = user && atLeast.editor.includes(user.userType as string);

    const onDelete = (congregation: Congregation) => {
        deleteCongregation(congregation, () => { searchCongregations(false, parameters); })
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.length ? <h2>No results.</h2> :
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className={`col-${canEdit ? '5' : '6'}`}>Name</th>
                        <th className={`col-${canEdit ? '4' : '5'}`}>Parish</th>
                        <th className="col-1"></th>
                        {
                            canEdit &&
                            <>
                                <th className="col-1"></th>
                                <th className="col-1"></th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {results.map((congregation: Congregation) =>
                        <tr key={congregation.id}>
                            <td>{congregation.name}</td>
                            <td>{congregation.parish}</td>
                            <td>
                                <Link className="btn btn-secondary" to={`/congregation/details/${congregation.id}`}>
                                    View
                                </Link>
                            </td>
                            {
                                canEdit &&
                                <>
                                    <td>
                                        <Link className="btn btn-primary" to={`/congregation/edit/${congregation.id}`}>
                                            Edit
                                        </Link>
                                     </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { onDelete(congregation); }}>
                                            {congregation.id === deletingId ? <Spinner size="sm" /> : "Delete"}
                                        </button>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
};

export default connect(
    (state: State) => ({ ...state.congregation.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(SearchResults as any);
