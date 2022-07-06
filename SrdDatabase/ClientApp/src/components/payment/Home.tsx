import * as React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../store';
import ExpandButton from '../shared/ExpandButton';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';
import * as SharedStore from '../../store/shared';
import { atLeast } from '../../helpers/userHelper';
import { connect } from 'react-redux';

type Props = SharedStore.State;

const Home = ({
    currentUser,
}: Props) => {
    const [expanded, setExpanded] = React.useState(false);

    const canAdd = currentUser && atLeast.accountant.includes(currentUser.userType);

    return (
        <>
            <div className="page-heading">
                <h1>Payments</h1>
                <ExpandButton expanded={expanded} setExpanded={setExpanded} />
                {
                    canAdd &&
                    <div>
                        <Link className="btn btn-primary float-right" to="/payment/add">Add new</Link>
                    </div>
                }
            </div>
            <SearchBox expanded={expanded} />
            <SearchResults />
        </>
    );
}

export default connect(
    (state: State) => state.shared
)(Home);
