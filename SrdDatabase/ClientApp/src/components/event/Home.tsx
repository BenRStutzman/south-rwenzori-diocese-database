import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../store';
import * as Store from '../../store/event/home';
import * as SharedStore from '../../store/shared';
import { Event } from '../../store/event';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './partials/SearchBox';
import SearchResults from './partials/SearchResults';
import { User } from '../../store/user';
import { atLeast } from '../../helpers/userRole';

type Props =
    Store.State &
    typeof Store.actionCreators &
    SharedStore.State &
    typeof SharedStore.actionCreators;

const Home = ({
    resultsLoading,
    results,
    loadArchdeaconries,
    loadCongregations,
    loadParishes,
    loadEventTypes,
    archdeaconries,
    parishes,
    congregations,
    eventTypes,
    searchEvents,
    deleteEvent,
    deletingId,
    parameters,
    setSearchStartDate,
    setSearchEndDate,
    setSearchEventTypeId,
    setSearchCongregationId,
    setSearchParishId,
    setSearchArchdeaconryId,
    setSearchPersonName,
    resetParameters,
    user,
}: Props) => {
    const loadData = () => {
        resetParameters();
        loadArchdeaconries();
        loadParishes();
        loadCongregations();
        loadEventTypes();
        searchEvents();
    };

    useEffect(loadData, []);

    const onSearch = () => {
        searchEvents(true, parameters);
    };

    const onDelete = (event: Event) => {
        deleteEvent(event, () => { searchEvents(false, parameters); });
    }

    const canAdd = atLeast.contributor.includes((user as User).userType as string);

    return (
        <>
            <h1 className="page-title">Events</h1>
            {
                canAdd &&
                <Link className="btn btn-primary float-right" to="/event/add">Add new</Link>
            }
            <SearchBox
                archdeaconries={archdeaconries}
                parishes={parishes}
                congregations={congregations}
                eventTypes={eventTypes}
                onSearch={onSearch}
                setSearchPersonName={setSearchPersonName}
                setSearchArchdeaconryId={setSearchArchdeaconryId}
                setSearchParishId={setSearchParishId}
                setSearchCongregationId={setSearchCongregationId}
                setSearchEventTypeId={setSearchEventTypeId}
                setSearchStartDate={setSearchStartDate}
                setSearchEndDate={setSearchEndDate}
                parameters={parameters}
            />
            <SearchResults
                results={results}
                resultsLoading={resultsLoading}
                onDelete={onDelete}
                deletingId={deletingId}
                user={user as User}
            />
        </>
    );
}    

export default connect(
    (state: State) => ({ ...state.event.home, ...state.shared }),
    { ...Store.actionCreators, ...SharedStore.actionCreators }
)(Home as any);
