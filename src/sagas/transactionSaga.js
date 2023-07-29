import { call, put, takeLatest } from 'redux-saga/effects';

import {
	getTransactionsError,
	getTransactionsLoading,
	getTransactionsSuccess,
} from 'reducers/transactionReducer';

import { GET_TRANSACTIONS } from 'actions/transactionActionTypes';

function* getTransactionsSaga(action) {
	try {
		yield put(getTransactionsLoading());
		// DO fetch call.
		yield put(getTransactionsSuccess());
	} catch (error) {
		yield put(getTransactionsError(error));
	}
}

// Generator function
export function* watchGetTransactions() {
	yield takeLatest(GET_TRANSACTIONS, getTransactionsSaga);
}
