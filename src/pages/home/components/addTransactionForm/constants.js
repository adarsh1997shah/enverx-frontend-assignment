import dayjs from 'dayjs';

export const INITIAL_TRANSACTION = {
	transactionType: 'expense',
	category: '',
	date: dayjs(Date.now()),
	amount: '',
	description: '',
};

export const CATEGORY_OPTIONS = {
	expense: [
		{ value: 'groceries', label: 'Groceries' },
		{ value: 'rent', label: 'Rent' },
		{ value: 'others', label: 'Others' },
	],
	income: [{ value: 'salary', label: 'Salary' }],
};

export const TRANSACTION_TYPES = [
	{ label: 'Expense', value: 'expense' },
	{ label: 'Income', value: 'income' },
];
