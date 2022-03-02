import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../helpers/miscellaneous';
import { Archdeaconry } from '../../models/archdeaconry';
import { Congregation } from '../../models/congregation';
import { EventParameters, EventParametersToSend, EventResults } from '../../models/event';
import { Parish } from '../../models/parish';
import { pagedResultsDefaults } from '../../models/shared';
import { loadCongregations, loadParishes } from '../shared';

const SET_PARAMETERS = 'EVENT.SET_PARAMETERS';
const SET_SEARCH_EVENT_TYPE_ID = 'EVENT.SET_SEARCH_EVENT_TYPE_ID';
const SET_SEARCH_START_DATE = 'EVENT.SET_SEARCH_START_DATE';
const SET_SEARCH_END_DATE = 'EVENT.SET_SEARCH_END_DATE';
const SET_SEARCH_PERSON_NAME = 'EVENT.SET_SEARCH_NAME';
const SET_SEARCH_DESCRIPTION = 'EVENT.SET_SEARCH_DESCRIPTION';
const SET_SEARCH_ARCHDEACONRY_ID = 'EVENT.SET_SEARCH_ARCHDEACONRY_ID';
const SET_SEARCH_PARISH_ID = 'EVENT.SET_SEARCH_PARISH_ID';
const SET_SEARCH_CONGREGATION_ID = 'EVENT.SET_SEARCH_CONGREGATION_ID';
const SET_RESULTS_LOADING = 'EVENT.SET_RESULTS_LOADING';
const SET_RESULTS = 'EVENT.SET_RESULTS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: EventResults) => ({
    type: SET_RESULTS,
    value: results,
});

const setSearchEventTypeIdAction = (eventTypeId: number) => ({
    type: SET_SEARCH_EVENT_TYPE_ID,
    value: eventTypeId,
});

const setSearchStartDateAction = (startDate?: Date) => ({
    type: SET_SEARCH_START_DATE,
    value: startDate,
});

const setSearchEndDateAction = (endDate?: Date) => ({
    type: SET_SEARCH_END_DATE,
    value: endDate,
});

const setSearchPersonNameAction = (personName?: string) => ({
    type: SET_SEARCH_PERSON_NAME,
    value: personName,
});

const setSearchDescriptionAction = (description?: string) => ({
    type: SET_SEARCH_DESCRIPTION,
    value: description,
})

const setSearchArchdeaconryIdAction = (archdeaconryId: number) => ({
    type: SET_SEARCH_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setSearchParishIdAction = (parishId?: number) => ({
    type: SET_SEARCH_PARISH_ID,
    value: parishId,
});

const setSearchCongregationIdAction = (congregationId?: number) => ({
    type: SET_SEARCH_CONGREGATION_ID,
    value: congregationId,
});

const setParametersAction = (parameters: EventParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (parameters: EventParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
    dispatch(loadParishes(parameters.archdeaconryId));
    dispatch(loadCongregations(parameters.parishId));
};

const prefillParameters = (congregationId?: number, parishId?: number, archdeaconryId?: number, search: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/event';

    const setParametersAndSearch = (parameters: EventParameters) => {
        dispatch(setParameters(parameters));

        if (search) {
            dispatch(searchEvents(parameters));
        }
    };

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`, backupUrl)
            .then(congregation => {
                setParametersAndSearch({
                    congregationId,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                });
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                setParametersAndSearch({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                });
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                setParametersAndSearch({
                    archdeaconryId,
                });
            });
    } else {
        setParametersAndSearch({});
    }
};

const setSearchEventTypeId = (eventTypeId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEventTypeIdAction(eventTypeId));
};

const setSearchStartDate = (startDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchStartDateAction(startDate));
};

const setSearchEndDate = (endDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchEndDateAction(endDate));
};

const setSearchPersonName = (personName: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchPersonNameAction(personName.length ? personName : undefined));
};

const setSearchDescription = (description: string): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchDescriptionAction(description.length ? description : undefined));
};

const setSearchArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchArchdeaconryIdAction(archdeaconryId));
    dispatch(loadParishes(archdeaconryId));
    dispatch(setSearchParishId(undefined));
};

const setSearchParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchParishIdAction(parishId));
    dispatch(loadCongregations(parishId));
    dispatch(setSearchCongregationId(undefined));
};

const setSearchCongregationId = (congregationId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setSearchCongregationIdAction(congregationId));
};

const searchEvents = (
    parameters: EventParameters = {},
    showLoading: boolean = true,
): AppThunkAction<Action> => (dispatch) => {

    const parametersToSend = {
        ...parameters,
        startDate: formattedDateAllowUndefined(parameters.startDate),
        endDate: formattedDateAllowUndefined(parameters.endDate),
    };

    if (showLoading) {
        dispatch(setResultsLoadingAction());
    }

    dispatch(setParametersAction(parameters));

    post<EventParametersToSend>('api/event/search', parametersToSend)
        .then(response => response.json() as Promise<EventResults>)
        .then(results => {
            dispatch(setResultsAction(results));
        });
};

export const actionCreators = {
    searchEvents,
    setSearchEventTypeId,
    setSearchParishId,
    setSearchCongregationId,
    setSearchArchdeaconryId,
    setSearchPersonName,
    setSearchDescription,
    setSearchStartDate,
    setSearchEndDate,
    prefillParameters,
};

export interface State {
    resultsLoading: boolean;
    results: EventResults;
    parameters: EventParameters,
}

const initialState: State = {
    results: { ...pagedResultsDefaults, events: [] },
    resultsLoading: true,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_SEARCH_EVENT_TYPE_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    eventTypeId: action.value,
                }
            };
        case SET_SEARCH_CONGREGATION_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    congregationId: action.value,
                }
            };
        case SET_SEARCH_PARISH_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    parishId: action.value,
                }
            };
        case SET_SEARCH_ARCHDEACONRY_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    archdeaconryId: action.value,
                }
            };
        case SET_SEARCH_PERSON_NAME:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    personName: action.value,
                }
            };
        case SET_SEARCH_DESCRIPTION:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    description: action.value,
                }
            };
        case SET_SEARCH_START_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    startDate: action.value,
                }
            };
        case SET_SEARCH_END_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    endDate: action.value,
                }
            };
        case SET_PARAMETERS:
            return {
                ...state,
                parameters: action.value,
            };
        case SET_RESULTS_LOADING:
            return {
                ...state,
                resultsLoading: true,
            };
        case SET_RESULTS:
            return {
                ...state,
                results: action.value,
                resultsLoading: false,
            };
        default:
            return state;
    }
};