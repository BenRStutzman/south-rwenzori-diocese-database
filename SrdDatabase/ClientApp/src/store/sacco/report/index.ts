import { Reducer } from 'redux';
import { AppThunkAction, Action } from '../..';
import { get, post } from '../../../helpers/apiHelpers';
import { formattedDateAllowUndefined } from '../../../helpers/miscellaneous';
import { Member } from '../../../models/sacco/member';
import { ReportParameters, ReportParametersToSend } from '../../../models/sacco/report';
import { Report } from '../../../models/report'

const SET_MEMBER_ID = 'REPORT.SET_MEMBER_ID';
const SET_START_DATE = 'REPORT.SET_START_DATE';
const SET_END_DATE = 'REPORT.SET_END_DATE';
const SET_REPORT_LOADING = 'REPORT.SET_REPORT_LOADING';
const SET_REPORT = 'REPORT.SET_REPORT';
const SET_PARAMETERS = 'REPORT.SET_PARAMETERS';

const setReportLoadingAction = () => ({
    type: SET_REPORT_LOADING,
});

const setReportAction = (report?: Report) => ({
    type: SET_REPORT,
    value: report,
});

const setMemberIdAction = (memberId?: number) => ({
    type: SET_MEMBER_ID,
    value: memberId,
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

const prefillParameters = (
    memberId?: number,
    startDate?: Date,
    endDate?: Date,
    generateReport: boolean = false): AppThunkAction<Action> => (dispatch) => {
    const backupUrl = '/sacco/report';

    const setParametersAndLoadReport = (parameters: ReportParameters) => {
        parameters = {
            ...parameters,
            startDate,
            endDate,
        };

        dispatch(setParametersAction(parameters));

        if (generateReport) {
            dispatch(loadReport(parameters));
        } else {
            dispatch(setReportAction(undefined));
        }
    };

    if (memberId) {
        get<Member>(`api/member/${memberId}`, backupUrl)
            .then(() => {
                setParametersAndLoadReport({
                    memberId,
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

const setMemberId = (memberId?: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setMemberIdAction(memberId));
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
    setMemberId,
    setStartDate,
    setEndDate,
};

export interface State {
    reportLoading: boolean;
    report?: Report;
    reportVersion: number;
    parameters: ReportParameters;
}

const initialState: State = {
    reportLoading: false,
    reportVersion: 0,
    parameters: {},
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SET_PARAMETERS:
            return {
                ...state,
                parameters: action.value,
            };
        case SET_MEMBER_ID:
            return {
                ...state,
                parameters: {
                    ...state.parameters,
                    memberId: action.value,
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
                reportVersion: action.value ? state.reportVersion + 1 : state.reportVersion,
            };
        default:
            return state;
    }
};