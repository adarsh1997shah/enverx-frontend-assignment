import transactionReducer from './transactionReducer';
import drawerReducer from './drawerReducer';

const rootReducers = {
	transactions: transactionReducer,
	drawer: drawerReducer,
};

export default rootReducers;
