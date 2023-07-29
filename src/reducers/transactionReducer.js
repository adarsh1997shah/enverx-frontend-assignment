import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
	isTransactionsLoading: false,
	isTransactionEditCreateLoading: false,
	isDeleteTransactionLoading: false,
	deleteTransaction: null,
	data: [],
	error: '',
};

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		// Get transactions.
		getTransactionsLoading: (state) => {
			state.error = '';
			state.isTransactionsLoading = true;
		},
		getTransactionsSuccess: (state, action) => {
			const transactions = action.payload.docs
				.filter((doc) => {
					// Doing soft delete, so filter out the items with the key.
					return !doc.data().isDeleted;
				})
				.map((doc) => {
					const { date, ...rest } = doc.data();

					return { ...rest, date: dayjs(date), id: doc.id };
				});

			state.data = transactions;
			state.isTransactionsLoading = false;
		},
		getTransactionsError: (state, action) => {
			state.error = action.payload;
			state.isTransactionsLoading = false;
		},
		// Create transaction.
		createTransactionLoading: (state) => {
			state.error = '';
			state.isTransactionEditCreateLoading = true;
		},
		createTransactionSuccess: (state, action) => {
			state.data.push(action.payload);
			state.isTransactionEditCreateLoading = false;
		},
		createTransactionError: (state, action) => {
			state.error = action.payload;
			state.isTransactionEditCreateLoading = false;
		},
		// Edit transaction.
		editTransactionLoading: (state) => {
			state.error = '';
			state.isTransactionEditCreateLoading = true;
		},
		editTransactionSuccess: (state, action) => {
			const { payload } = action;

			state.data = state.data.map((item) => {
				if (item.id === payload.id) {
					return payload;
				}

				return item;
			});
			state.isTransactionEditCreateLoading = false;
		},
		editTransactionError: (state, action) => {
			state.error = action.payload;
			state.isTransactionEditCreateLoading = false;
		},
		// Delete transaction.
		deleteTransactionLoading: (state, action) => {
			state.error = '';
			state.isDeleteTransactionLoading = true;
			state.deleteTransaction = action.payload;
		},
		deleteTransactionSuccess: (state, action) => {
			const { payload } = action;

			state.data = state.data.filter((item) => item.id !== payload.id);
			state.isDeleteTransactionLoading = false;
		},
		deleteTransactionError: (state, action) => {
			state.error = action.payload;
			state.isDeleteTransactionLoading = false;
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
	editTransactionLoading,
	editTransactionSuccess,
	editTransactionError,
	deleteTransactionLoading,
	deleteTransactionSuccess,
	deleteTransactionError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
