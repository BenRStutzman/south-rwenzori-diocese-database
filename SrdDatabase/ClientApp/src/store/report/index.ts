import { Reducer } from 'redux';
import { AppThunkAction, Action } from '..';
import { get, post } from '../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../helpers/miscellaneous';
import { Archdeaconry } from '../../models/archdeaconry';
import { Congregation } from '../../models/congregation';
import { Parish } from '../../models/parish';
import { Report, ReportParameters, ReportParametersToSend } from '../../models/report';
import { loadCongregations, loadParishes } from '../shared';

const SET_ARCHDEACONRY_ID = 'REPORT.SET_ARCHDEACONRY_ID';
const SET_PARISH_ID = 'REPORT.SET_REPORT_PARISH_ID';
const SET_CONGREGATION_ID = 'REPORT.SET_CONGREGATION_ID';
const SET_START_DATE = 'REPORT.SET_START_DATE';
const SET_END_DATE = 'REPORT.SET_END_DATE';
const SET_REPORT_LOADING = 'REPORT.SET_REPORT_LOADING';
const SET_REPORT = 'REPORT.SET_REPORT';
const SET_PARAMETERS = 'REPORT.SET_PARAMETERS';

const setReportLoadingAction = () => ({
    type: SET_REPORT_LOADING,
});

const setReportAction = (report: Report) => ({
    type: SET_REPORT,
    value: report,
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

const setStartDateAction = (startDate?: Date) => ({
    type: SET_START_DATE,
    value: startDate,
});

const setEndDateAction = (endDate?: Date) => ({
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
    dispatch(loadCongregations(parameters.parishId));
};

const prefillParameters = (
    congregationId?: number,
    parishId?: number,
    archdeaconryId?: number,
    startDate?: Date,
    endDate?: Date,
    load: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = 'report';

    const setParametersAndLoadReport = (parameters: ReportParameters) => {
        parameters = {
            ...parameters,
            startDate,
            endDate,
        };

        dispatch(setParameters(parameters));

        if (load) {
            dispatch(loadReport(parameters));
        }
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

const setStartDate = (startDate?: Date): AppThunkAction<Action> => (dispatch) => {
    dispatch(setStartDateAction(startDate));
};

const setEndDate = (endDate?: Date): AppThunkAction<Action> => (dispatch) => {
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
    dispatch(setReportLoadingAction());
    dispatch(setParametersAction(parameters));

    const parametersToSend = {
        ...parameters,
        startDate: formattedDateAllowUndefined(parameters.startDate),
        endDate: formattedDateAllowUndefined(parameters.endDate),
    };

    return post<ReportParametersToSend>('/api/report', parametersToSend)
        .then(response => {
            const fileName = response.headers
                .get('Content-Disposition')
                ?.split('filename=')[1].split(';')[0] ?? 'report.csv';

            response.text().then(text => {
                dispatch(setReportAction({
                    fileName,
                    data: text
                }));
            });
        });
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
    reportLoading: boolean;
    report?: Report;
    parameters: ReportParameters;
}

const initialState: State = {
    reportLoading: false,
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
        case SET_REPORT_LOADING:
            return {
                ...state,
                reportLoading: true,
            };
        case SET_REPORT:
            return {
                ...state,
                report: action.value,
                reportLoading: false,
            };
        default:
            return state;
    }
};