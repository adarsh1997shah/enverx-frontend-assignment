import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
	createTransactionError,
	createTransactionLoading,
	createTransactionSuccess,
	deleteTransactionError,
	deleteTransactionLoading,
	deleteTransactionSuccess,
	editTransactionError,
	editTransactionLoading,
	editTransactionSuccess,
	getTransactionsError,
	getTransactionsLoading,
	getTransactionsSuccess,
} from 'reducers/transactionReducer';
import { closeDrawer } from 'reducers/drawerReducer';
import { openSnackbar } from 'reducers/snackbarReducer';

import {
	CREATE_TRANSACTION,
	DELETE_TRANSACTION,
	EDIT_TRANSACTION,
	GET_TRANSACTIONS,
} from 'actions/transactionActionTypes';

import {
	addTransaction,
	fetchTransactions,
	removeTransaction,
	updateTransaction,
} from 'services/transaction';

function* getTransactionsSaga(action) {
	try {
		yield put(getTransactionsLoading());

		const res = yield call(fetchTransactions);

		if (res?.size > 0) {
			yield put(getTransactionsSuccess(res));
		}
	} catch (error) {
		yield put(getTransactionsError(error));
		yield put(openSnackbar({ severity: 'error', msg: error.message }));
	}
}

function* createTransaction(action) {
	try {
		yield put(createTransactionLoading());

		const res = yield call(addTransaction, action.payload);

		if (res.id) {
			yield put(createTransactionSuccess({ ...action.payload, id: res.id }));
			yield put(closeDrawer());
			yield put(
				openSnackbar({ severity: 'success', msg: 'Transaction created successfully' })
			);
		}
	} catch (error) {
		yield put(createTransactionError(error.message));
		yield put(openSnackbar({ severity: 'error', msg: error.message }));
	}
}

function* editTransaction(action) {
	try {
		yield put(editTransactionLoading());

		yield call(updateTransaction, action.payload);

		yield put(editTransactionSuccess(action.payload));
		yield put(closeDrawer());
		yield put(
			openSnackbar({ severity: 'success', msg: 'Transaction updated successfully' })
		);
	} catch (error) {
		yield put(editTransactionError(error.message));
		yield put(openSnackbar({ severity: 'error', msg: error.message }));
	}
}

function* deleteTransaction(action) {
	try {
		yield put(deleteTransactionLoading(action.payload));

		const test = yield call(removeTransaction, action.payload);
		console.log('test', test);

		yield put(deleteTransactionSuccess(action.payload));
		yield put(
			openSnackbar({ severity: 'success', msg: 'Transaction deleted successfully' })
		);
	} catch (error) {
		yield put(deleteTransactionError(error.message));
		yield put(openSnackbar({ severity: 'error', msg: error.message }));
	}
}

// Generator function
export function* watchGetTransactions() {
	yield all([
		takeLatest(GET_TRANSACTIONS, getTransactionsSaga),
		takeLatest(CREATE_TRANSACTION, createTransaction),
		takeLatest(EDIT_TRANSACTION, editTransaction),
		takeLatest(DELETE_TRANSACTION, deleteTransaction),
	]);
}
