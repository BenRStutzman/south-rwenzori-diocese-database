import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State } from '../../store';
import * as Store from '../../store/home';
import DetailsList from '../shared/DetailsList';
import LoadingSpinner from '../shared/LoadingSpinner';

type Props =
    Store.State &
    typeof Store.actionCreators;

const Home = ({
    details,
    detailsLoading,
    loadDetails,
}: Props) => {
    const loadData = () => {
        loadDetails();
    };

    useEffect(loadData, []);

    return <>
        <h1 className="page-title">South Rwenzori Diocese</h1>
        {
            detailsLoading ? <LoadingSpinner /> :
                <div className="details-boxes">
                    <DetailsList
                        title="Archdeaconries"
                        itemType="archdeaconry"
                        items={details.archdeaconries.map(archdeaconry => ({
                            id: archdeaconry.id,
                            displayText: archdeaconry.name,
                        }))}
                    />
                    <DetailsList
                        title="Parishes"
                        itemType="parish"
                        items={details.parishes.map(parish => ({
                            id: parish.id,
                            displayText: parish.name,
                        }))}
                    />
                    <DetailsList
                        title="Congregations"
                        itemType="congregation"
                        items={details.congregations.map(congregation => ({
                            id: congregation.id,
                            displayText: congregation.name,
                        }))}
                    />
                    <DetailsList
                        title="Recent Events"
                        itemType="event"
                        items={details.recentEvents.map(event => ({
                            id: event.id,
                            displayText: `${new Date(event.date as Date).toLocaleDateString('en-ca')}: ${event.eventType} of ${event.firstPersonName}${event.secondPersonName ? ` and ${event.secondPersonName}` : ''} at ${event.congregation} Congregation`,
                        }))}
                    />
                </div>
        }
        </>
};

export default connect(
    (state: State) => state.home,
    (dispatch) => bindActionCreators(Store.actionCreators, dispatch)
)(Home);
