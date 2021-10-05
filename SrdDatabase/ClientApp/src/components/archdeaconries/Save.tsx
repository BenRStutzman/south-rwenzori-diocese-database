import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/archdeaconries/Save';
import { RouteComponentProps } from 'react-router';

type Props =
    Store.State
    & typeof Store.actionCreators
    & RouteComponentProps<{ archdeaconryId: string }>;

class Save extends React.PureComponent<Props> {
    public componentDidMount() {
        this.getData();
    }

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
        this.props.requestArchdeaconry(parseInt(this.props.match.params.archdeaconryId));
    }

    private renderArchdeaconriesTable() {
        return (
            this.props.archdeaconry &&
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={this.props.archdeaconry.id}>
                        <td>{this.props.archdeaconry.id}</td>
                        <td>{this.props.archdeaconry.name}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default connect(
    (state: State) => state.archdeaconries.save,
    Store.actionCreators
)(Save as any);
