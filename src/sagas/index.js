import { all, fork } from 'redux-saga/effects';

import { watchGetTransactions } from './transactionSaga';

const rootSaga = function* () {
	yield all([fork(watchGetTransactions)]);
};

export default rootSaga;
