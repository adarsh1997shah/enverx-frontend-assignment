import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import rootReducers from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: rootReducers,
	middleware: [sagaMiddleware],
});

// Run saga to watch reducers action
sagaMiddleware.run(rootSaga);

export default store;
