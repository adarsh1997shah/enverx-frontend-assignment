import dayjs from 'dayjs';

export const INITIAL_TRANSACTION = {
	transactionType: 'expense',
	category: '',
	date: dayjs(Date.now()),
	amount: '',
	description: '',
};
