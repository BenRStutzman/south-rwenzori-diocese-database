import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/View';
import { Archdeaconry } from '../../store/archdeaconries/Archdeaconries';

// At runtime, Redux will merge together...
type Props =
    Store.State // ... state we've requested from the Redux store
    & typeof Store.actionCreators // ... plus action creators we've requested

class View extends React.PureComponent<Props> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.getData();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.getData();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Archdeaconries</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderArchdeaconriesTable()}
            </React.Fragment>
        );
    }

    private getData() {
        this.props.requestArchdeaconries();
    }

    private renderArchdeaconriesTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.archdeaconries.map((archdeaconry: Archdeaconry) =>
                        <tr key={archdeaconry.id}>
                            <td>{archdeaconry.id}</td>
                            <td>{archdeaconry.name}</td>
                            <td><a href={`archdeaconries/${archdeaconry.id}`}>Edit</a></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default connect(
    (state: State) => state.archdeaconries.view,
    Store.actionCreators
)(View as any);
