import transactionReducer from './transactionReducer';
import drawerReducer from './drawerReducer';
import snackbarReducer from './snackbarReducer';

const rootReducers = {
	transactions: transactionReducer,
	drawer: drawerReducer,
	snackbar: snackbarReducer,
};

export default rootReducers;
