import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Member } from '../../../../models/sacco/member';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import * as Store from '../../../../store/sacco/member/home';
import * as SharedStore from '../../../../store/sacco/shared';
import { State } from '../../../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paging from '../../../shared/Paging';
import SortButton from '../../../shared/SortButton';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const SearchResults = ({
    resultsLoading,
    parameters,
    results,
    deletingMemberIds,
    deleteMember,
    searchMembers,
}: Props) => {
    const onPage = (pageNumber: number) => {
        searchMembers({ ...parameters, pageNumber });
    };

    const onSort = (sortColumn?: string, sortDescending?: boolean) => {
        searchMembers({ ...parameters, sortColumn, sortDescending });
    };

    const onDelete = (member: Member) => {
        deleteMember(member, () => { searchMembers(parameters, false); });
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
                        <th className="col-10">
                            Name
                            <SortButton
                                parameters={parameters}
                                columnName="name"
                                onSort={onSort}
                            />
                        </th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody className={resultsLoading ? 'results-loading' : ''}>
                    {results.members.map((member: Member) =>
                        <tr key={member.id}>
                            <td>
                                <Link to={`/sacco/member/details/${member.id}`}>{member.name}</Link>
                            </td>
                            <td className="buttons-column">
                                <Link className="btn btn-secondary" to={`/sacco/member/details/${member.id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-primary" to={`/sacco/member/edit/${member.id}`}>
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={() => { onDelete(member); }}>
                                    {deletingMemberIds.includes(member.id as number) ? <Spinner size="sm" /> : "Delete"}
                                </button>
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
    (state: State) => ({ ...state.sacco.member.home, ...state.sacco.shared }),
    (dispatch) => bindActionCreators({ ...Store.actionCreators, ...SharedStore.actionCreators }, dispatch)
)(SearchResults);
