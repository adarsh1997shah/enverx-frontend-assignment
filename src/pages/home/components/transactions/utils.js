import {
	CATEGORY_OPTIONS,
	TRANSACTION_TYPES,
} from 'pages/home/components/addTransactionForm/constants';

export function getTransactionTypeLabel(transactionType) {
	return TRANSACTION_TYPES.find(({ value }) => value === transactionType)?.label;
}

export function getCategoryLabel({ transactionType, category }) {
	return CATEGORY_OPTIONS?.[transactionType]?.find(({ value }) => value === category)
		?.label;
}
