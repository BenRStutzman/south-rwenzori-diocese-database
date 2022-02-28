import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { Archdeaconry } from '../../models/archdeaconry';
import { Congregation } from '../../models/congregation';
import { Parish } from '../../models/parish';
import { ReportParameters } from '../../models/report';
import { loadCongregations, loadParishes } from '../shared';

const SET_ARCHDEACONRY_ID = 'REPORT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'REPORT.SET_REPORT_PARISH_ID';
const SET_CONGREGATION_ID = 'REPORT.SET_CONGREGATION_ID';
const SET_START_DATE = 'REPORT.SET_START_DATE';
const SET_END_DATE = 'REPORT.SET_END_DATE';
const SET_RESULTS_LOADING = 'REPORT.SET_RESULTS_LOADING';
const SET_RESULTS = 'REPORT.SET_RESULTS';
const SET_PARAMETERS = 'REPORT.SET_PARAMETERS';

const setResultsLoadingAction = () => ({
    type: SET_RESULTS_LOADING,
});

const setResultsAction = (results: string) => ({
    type: SET_RESULTS,
    value: results,
});

const setArchdeaconryIdAction = (archdeaconryId?: number) => ({
    type: SET_ARCHDEACONRY_ID,
    value: archdeaconryId,
});

const setParishIdAction = (parishId?: number) => ({
    type: SET_PARISH_ID,
    value: parishId,
});

const setCongregationIdAction = (congregationId?: number) => ({
    type: SET_CONGREGATION_ID,
    value: congregationId,
});

const setStartDateAction = (startDate: Date) => ({
    type: SET_START_DATE,
    value: startDate,
});

const setEndDateAction = (endDate: Date) => ({
    type: SET_END_DATE,
    value: endDate,
});

const setParametersAction = (parameters: ReportParameters) => ({
    type: SET_PARAMETERS,
    value: parameters,
});

const setParameters = (parameters: ReportParameters): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParametersAction(parameters));
    dispatch(loadParishes(parameters.archdeaconryId));
};

const prefillParameters = (congregationId?: number, parishId?: number, archdeaconryId?: number): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = 'report';

    const setParametersAndLoadReport = (parameters: ReportParameters) => {
        dispatch(setParameters(parameters));
        dispatch(loadReport(parameters));
    };

    if (congregationId) {
        get<Congregation>(`api/congregation/${congregationId}`, backupUrl)
            .then(congregation => {
                setParametersAndLoadReport({
                    congregationId,
                    parishId: congregation.parishId,
                    archdeaconryId: congregation.archdeaconryId,
                });
            });
    } else if (parishId) {
        get<Parish>(`api/parish/${parishId}`, backupUrl)
            .then(parish => {
                setParametersAndLoadReport({
                    parishId,
                    archdeaconryId: parish.archdeaconryId,
                });
            });
    } else if (archdeaconryId) {
        get<Archdeaconry>(`api/archdeaconry/${archdeaconryId}`, backupUrl)
            .then(() => {
                setParametersAndLoadReport({
                    archdeaconryId,
                });
            });
    } else {
        setParametersAndLoadReport({});
    }
};

const setStartDate = (startDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setStartDateAction(startDate));
};

const setEndDate = (endDate: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setEndDateAction(endDate));
};

const setArchdeaconryId = (archdeaconryId: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setArchdeaconryIdAction(archdeaconryId));
    dispatch(loadParishes(archdeaconryId));
    dispatch(setParishId(undefined));
};

const setParishId = (parishId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setParishIdAction(parishId));
    dispatch(loadCongregations(parishId));
    dispatch(setCongregationId(undefined));
};

const setCongregationId = (congregationId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setCongregationIdAction(congregationId));
};

const loadReport = (parameters: ReportParameters = {}): AppThunkAction<Action> => (dispatch) => {
    dispatch(setResultsLoadingAction());
    dispatch(setParametersAction(parameters));

    return post<ReportParameters>('/api/congregation/report', parameters)
        .then(response => response.text())
        .then(text => { dispatch(setResultsAction(text)); });
};

export const actionCreators = {
    loadReport,
    prefillParameters,
    setArchdeaconryId,
    setParishId,
    setCongregationId,
    setStartDate,
    setEndDate,
};

export interface State {
    resultsLoading: boolean;
    results?: string;
    parameters: ReportParameters;
}

const initialState: State = {
    resultsLoading: true,
    results: undefined,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_PARAMETERS:
            return {
                ...state,
                parameters: action.value,
            };
        case SET_CONGREGATION_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    congregationId: action.value,
                }
            };
        case SET_PARISH_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    parishId: action.value,
                }
            };
        case SET_ARCHDEACONRY_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    archdeaconryId: action.value,
                }
            };
        case SET_START_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    startDate: action.value,
                }
            };
        case SET_END_DATE:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    endDate: action.value,
                }
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