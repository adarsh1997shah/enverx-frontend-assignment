import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	createTransactionError,
	createTransactionLoading,
	createTransactionSuccess,
	getTransactionsError,
	getTransactionsLoading,
	getTransactionsSuccess,
} from 'reducers/transactionReducer';
import { closeDrawer } from 'reducers/drawerReducer';

import { CREATE_TRANSACTION, GET_TRANSACTIONS } from 'actions/transactionActionTypes';

import { addTransaction } from 'services/transaction';

function* getTransactionsSaga(action) {
	try {
		yield put(getTransactionsLoading());
		yield put(getTransactionsSuccess());
	} catch (error) {
		yield put(getTransactionsError(error));
	}
}

function* createTransaction(action) {
	try {
		yield put(createTransactionLoading());
		const res = yield call(addTransaction, action.payload);

		if (res.id) {
			yield all([put(createTransactionSuccess(action.payload)), put(closeDrawer())]);
		}
	} catch (error) {
		yield put(createTransactionError());
	}
}

// Generator function
export function* watchGetTransactions() {
	yield all([
		takeLatest(GET_TRANSACTIONS, getTransactionsSaga),
		takeLatest(CREATE_TRANSACTION, createTransaction),
	]);
}
