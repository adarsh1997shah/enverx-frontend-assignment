import React from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	Typography,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useDispatch, useSelector } from 'react-redux';

import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

import { openDrawer } from 'reducers/drawerReducer';

import { DELETE_TRANSACTION } from 'actions/transactionActionTypes';

import { getCategoryLabel } from 'pages/home/components/transactions/utils';
import AddTransactionForm from 'pages/home/components/addTransactionForm';

function Transaction({ transaction, index, transactions }) {
	const { transactionType, category, date, amount, description } = transaction;

	const dispatch = useDispatch();
	const confirm = useConfirm();
	const { isDeleteTransactionLoading, deleteTransaction } = useSelector(
		({ transactions }) => transactions
	);

	const handleEditTransaction = () => {
		dispatch(
			openDrawer({ component: <AddTransactionForm editTransaction={transaction} /> })
		);
	};

	const handleTransactionDelete = () => {
		confirm({ description: 'You want to delete this transaction ?' })
			.then(() => {
				dispatch({ type: DELETE_TRANSACTION, payload: transaction });
			})
			.catch(() => {
				/* ... */
			});
	};

	return (
		<Card
			sx={{
				mt: index === 0 ? 0 : '',
				mb: index === transactions.length - 1 ? '' : 1,
			}}>
			<CardHeader
				sx={{ pb: 1 }}
				title={
					<Box display="flex" justifyContent="space-between">
						<Box display="flex" alignItems="center">
							<Typography variant="h5" mr={1}>
								₹ {new Intl.NumberFormat('en-IN').format(amount)}
							</Typography>
							{transactionType === 'expense' ? (
								<CallMadeIcon color="error" fontSize="small" />
							) : (
								<CallReceivedIcon color="success" fontSize="small" />
							)}
						</Box>

						<Chip label={getCategoryLabel({ transactionType, category })} color="info" />
					</Box>
				}
				subheader={date.format('DD MMM, YYYY')}
			/>

			<CardContent sx={{ py: 0 }}>
				<Box display="flex">
					<Typography flex={1} variant="body2">
						{description}
					</Typography>
				</Box>
			</CardContent>

			<CardActions>
				<Button
					size="small"
					onClick={handleEditTransaction}
					disabled={
						deleteTransaction?.id === transaction.id ? isDeleteTransactionLoading : false
					}>
					Edit
				</Button>
				<Button
					size="small"
					onClick={handleTransactionDelete}
					disabled={
						deleteTransaction?.id === transaction.id ? isDeleteTransactionLoading : false
					}>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}

export default Transaction;
