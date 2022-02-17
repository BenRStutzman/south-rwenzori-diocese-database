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
    const onPage = (pageNumber: number) => {
        searchCharges({ ...parameters, pageNumber });
    }

    const onDelete = (charge: Charge) => {
        deleteCharge(charge, () => { searchCharges(parameters); });
    };

    return resultsLoading ? <LoadingSpinner /> :
        !results.totalResults ? <h2>No results.</h2> :
            <>
                <Paging
                    resultsLoading={resultsLoading}
                    results={results}
                    onPage={onPage}
                />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th className="col-3">Amount Per Year (UGX)</th>
                            <th className="col-2">Congregation</th>
                            <th className="col-2">Start Year</th>
                            <th className="col-2">End Year</th>
                            <th className="col-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.charges.map((charge: Charge) =>
                            <tr key={charge.id}>
                                <td className="money-column">{charge.amountPerYear}</td>
                                <td>
                                    <Link to={`/congregation/details/${charge.congregationId}`}>{charge.congregation}</Link>
                                </td>
                                <td>{charge.startYear}</td>
                                <td>{charge.endYear ?? 'ongoing'}</td>
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
                    resultsLoading={resultsLoading}
                    results={results}
                    onPage={onPage}
                />
            </>;
}

export default connect(
    (state: State) => ({ ...state.charge.home, ...state.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
