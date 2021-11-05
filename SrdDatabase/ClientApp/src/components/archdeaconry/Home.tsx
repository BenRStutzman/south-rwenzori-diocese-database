import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconry/home';
import { Archdeaconry } from '../../store/archdeaconry';
import { useEffect } from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import Row from './Row';

type Props = Store.State & typeof Store.actionCreators;

const Home = ({
    archdeaconries,
    archdeaconriesLoading,
    loadArchdeaconries,
    deleteArchdeaconry,
    deletingId,
}: Props) => {
    const loadData = () => { loadArchdeaconries() };

    useEffect(loadData, []);

    return archdeaconriesLoading ? <LoadingSpinner /> :
        <>
            <h1 className="page-title">Archdeaconries</h1>
            <Link className="btn btn-primary float-right" to="/archdeaconry/add">Add new</Link>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-10">Name</th>
                        <th className="col-1"></th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {archdeaconries.map((archdeaconry: Archdeaconry) =>
                        <Row
                            key={archdeaconry.id}
                            archdeaconry={archdeaconry}
                            deleteArchdeaconry={deleteArchdeaconry}
                            isDeleting={deletingId === archdeaconry.id}
                        />
                    )}
                </tbody>
            </table>
        </>;
}    

export default connect(
    (state: State) => state.archdeaconry.home,
    Store.actionCreators
)(Home as any);
