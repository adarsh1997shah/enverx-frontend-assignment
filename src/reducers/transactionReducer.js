import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	transactions: {
		isLoading: false,
		data: [],
		error: '',
	},
};

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		getTransactionsLoading: (state, action) => {},
		getTransactionsSuccess: (state, action) => {
			console.log('success', state.transactions, action);
		},
		getTransactionsError: (state, action) => {},
		createTransactionLoading: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		createTransactionSuccess: (state, action) => {
			state.transactions.push(action.payload);
			state.isLoading = false;
		},
		createTransactionError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	getTransactionsLoading,
	getTransactionsSuccess,
	getTransactionsError,
	createTransactionLoading,
	createTransactionSuccess,
	createTransactionError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
