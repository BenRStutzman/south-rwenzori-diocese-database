import { Reducer } from 'redux';
import { Action, AppThunkAction } from '../..';
import { get, getRaw } from '../../../helpers/apiHelpers';
import { Report } from '../../../models/report';
import { TransactionDetails } from '../../../models/sacco/transaction';

const REQUEST_DETAILS = 'SACCO_TRANSACTION.REQUEST_DETAILS';
const RECEIVE_DETAILS = 'SACCO_TRANSACTION.RECEIVE_DETAILS';
const SET_RECEIPT_LOADING = 'SACCO_TRANSACTION.SET_RECEIPT_LOADING';
const SET_RECEIPT = 'SACCO_TRANSACTION.SET_RECEIPT';

const requestDetailsAction = () => ({
    type: REQUEST_DETAILS,
});

const receiveDetailsAction = (details: TransactionDetails) => ({
    type: RECEIVE_DETAILS,
    value: details,
});

const setReceiptLoadingAction = () => ({
    type: SET_RECEIPT_LOADING,
});

const setReceiptAction = (receipt?: Report) => ({
    type: SET_RECEIPT,
    value: receipt,
});

const loadDetails = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(requestDetailsAction());
    dispatch(loadReceipt(id));

    get<TransactionDetails>(`api/sacco/transaction/details/${id}`, '/sacco/transaction')
        .then(details => {
            dispatch(receiveDetailsAction(details));
        });
};

const loadReceipt = (id: number): AppThunkAction<Action> => (dispatch) => {
    dispatch(setReceiptLoadingAction());

    return getRaw(`/api/sacco/transaction/receipt/${id}`)
        .then(response => {
            const fileName = response.headers
                .get('Content-Disposition')
                ?.split('filename=')[1].split(';')[0] ?? 'receipt.csv';

            response.text().then(text => {
                dispatch(setReceiptAction({
                    fileName,
                    data: text
                }));
            });
        });
};


export const actionCreators = {
    loadDetails,
    loadReceipt,
};

export interface State {
    detailsLoading: boolean;
    details: TransactionDetails;
    receiptLoading: boolean;
    receipt?: Report;
}

const initialState: State = {
    detailsLoading: true,
    details: {
        transaction: {},
    },
    receiptLoading: true,
};

export const reducer: Reducer<State, Action> = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case REQUEST_DETAILS:
            return {
                ...state,
                detailsLoading: true,
            };
        case RECEIVE_DETAILS:
            return {
                ...state,
                detailsLoading: false,
                details: action.value,
            };
        case SET_RECEIPT_LOADING:
            return {
                ...state,
                receiptLoading: true,
            };
        case SET_RECEIPT:
            return {
                ...state,
                receipt: action.value,
                receiptLoading: false,
            };
        default:
            return state;
    }
};
