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
		getTransactionsLoading: (state, action) => {
			console.log('loading', state.transactions, action);
		},
		getTransactionsSuccess: (state, action) => {
			console.log('success', state.transactions, action);
		},
		getTransactionsError: (state, action) => {},
	},
});

export const { getTransactionsLoading, getTransactionsSuccess, getTransactionsError } =
	transactionsSlice.actions;
export default transactionsSlice.reducer;
