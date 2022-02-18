import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { Charge } from '../../../models/charge';
import * as Store from '../../../store/charge/home';
import * as SharedStore from '../../../store/shared';
import { State } from '../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../shared/Paging';
import SortButton from '../../shared/SortButton';
import { combineYears } from '../../../helpers/chargeHelper';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingChargeIds,
    deleteCharge,
    parameters,
    searchCharges,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchCharges({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchCharges({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (charge: Charge) => {
        deleteCharge(charge, () => { searchCharges(parameters, false); });
    };

    return (
        <>
            <Paging
                results={results}
                onPage={onPage}
            />
            {resultsLoading && <LoadingSpinner onTable />}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-2">
                            Year(s)
                            <SortButton
                                parameters={parameters}
                                columnName="endYear"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-4">
                            Congregation
                            <SortButton
                                parameters={parameters}
                                columnName="congregation"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-3">
                            Amount Per Year (UGX)
                            <SortButton
                                parameters={parameters}
                                columnName="amountPerYear"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-3"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.charges.map((charge: Charge) =>
                        <tr key={charge.id}>
                            <td>{combineYears(charge)}</td>
                            <td>
                                <Link to={`/congregation/details/${charge.congregationId}`}>{charge.congregation}</Link>
                            </td>
                            <td className="money-column">{charge.amountPerYear}</td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/charge/details/${charge.id}`}>
                                    View
                                </Link>
                                <>
                                    <Link className="btn btn-primary" to={`/charge/edit/${charge.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => { onDelete(charge); }}>
                                        {deletingChargeIds.includes(charge.id as number) ? <Spinner size="sm" /> : 'Delete'}
                                    </button>
                                </>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!resultsLoading && !results.totalResults && <h2>No results.</h2>}
            <Paging
                results={results}
                onPage={onPage}
            />
        </>
    );
}

export default connect(
    (state: State) => ({ ...state.charge.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
