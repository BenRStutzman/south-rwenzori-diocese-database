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

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    results,
    deletingChargeId,
    deleteCharge,
    parameters,
    searchCharges,
}: Props) => {
    const nextPage = () => {
        searchCharges(parameters, results.pageNumber + 1);
    };

    const previousPage = () => {
        searchCharges(parameters, results.pageNumber - 1);
    };

    const onDelete = (charge: Charge) => {
        deleteCharge(charge, () => { searchCharges(parameters, results.pageNumber, false); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <Paging
                    results={results}
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className="col-2">Amount (UGX)</th>
                            <th className="col-3">Congregation</th>
                            <th className="col-2">Date</th>
                            <th className="col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.charges.map((charge: Charge) =>
                            <tr key={charge.id}>
                                <td className="balance-column">{charge.amount}</td>
                                <td>
                                    <Link to={`/congregation/details/${charge.congregationId}`}>{charge.congregation}</Link>
                                </td>
                                <td>{charge.date ? new Date(charge.date).toLocaleDateString('en-ca') : ''}</td>
                                <td className="buttons-column">
                                    <Link className="btn btn-secondary" to={`/charge/details/${charge.id}`}>
                                        View
                                    </Link>
                                    <>
                                        <Link className="btn btn-primary" to={`/charge/edit/${charge.id}`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => { onDelete(charge); }}>
                                            {charge.id === deletingChargeId ? <Spinner size="sm" /> : 'Delete'}
                                        </button>
                                    </>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Paging
                    results={results}
                    nextPage={nextPage}
                    previousPage={previousPage}
                />
            </>;
}

export default connect(
    (state: State) => ({ ...state.charge.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
