import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ArchdeaconriesStore from '../store/Archdeaconries';

// At runtime, Redux will merge together...
type ArchdeaconryProps =
    ArchdeaconriesStore.ArchdeaconriesState // ... state we've requested from the Redux store
    & typeof ArchdeaconriesStore.actionCreators // ... plus action creators we've requested

class Archdeaconries extends React.PureComponent<ArchdeaconryProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
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

    private ensureDataFetched() {
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
                    {this.props.archdeaconries.map((archdeaconry: ArchdeaconriesStore.Archdeaconry) =>
                        <tr key={archdeaconry.id}>
                            <td>{archdeaconry.id}</td>
                            <td>{archdeaconry.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.archdeaconries, // Selects which state properties are merged into the component's props
    ArchdeaconriesStore.actionCreators // Selects which action creators are merged into the component's props
)(Archdeaconries as any); // eslint-disable-line @typescript-eslint/no-explicit-any
