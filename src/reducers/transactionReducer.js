import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
	isLoading: false,
	data: [],
	error: '',
};

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		getTransactionsLoading: (state, action) => {
			state.isLoading = true;
			state.error = '';
		},
		getTransactionsSuccess: (state, action) => {
			const transactions = action.payload.docs.map((doc) => {
				const { date, ...rest } = doc.data();

				return { ...rest, date: dayjs(date), id: doc.id };
			});

			state.data = transactions;
			state.isLoading = false;
		},
		getTransactionsError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		createTransactionLoading: (state) => {
			state.isLoading = true;
			state.error = '';
		},
		createTransactionSuccess: (state, action) => {
			state.data.push(action.payload);
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
