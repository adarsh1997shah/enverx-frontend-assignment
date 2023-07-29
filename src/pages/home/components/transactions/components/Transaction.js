import React from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { blue } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

import { openDrawer } from 'reducers/drawerReducer';

import { getCategoryLabel } from 'pages/home/components/transactions/utils';
import AddTransactionForm from 'pages/home/components/addTransactionForm';

function Transaction({ transaction, index }) {
	const { transactionType, category, date, amount, description } = transaction;

	const dispatch = useDispatch();

	const confirm = useConfirm();

	const handleEditTransaction = () => {
		dispatch(
			openDrawer({ component: <AddTransactionForm editTransaction={transaction} /> })
		);
	};

	const handleTransactionDelete = () => {
		confirm({ description: 'You want to delete this transaction ?' })
			.then(() => {
				/* ... */
			})
			.catch(() => {
				/* ... */
			});
	};

	return (
		<Card sx={{ my: 2, mt: index === 0 ? 0 : '', bgcolor: blue[50] }}>
			<CardHeader
				sx={{ pb: 1 }}
				title={
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
				}
				subheader={date.format('DD MMM, YYYY')}
			/>

			<CardContent sx={{ py: 0 }}>
				<Box display="flex">
					<Typography sx={{ width: 100 }} fontWeight="bold">
						Category:
					</Typography>
					<Typography>{getCategoryLabel({ transactionType, category })}</Typography>
				</Box>

				<Box display="flex">
					<Typography sx={{ width: 100 }} fontWeight="bold">
						Description:
					</Typography>
					<Typography>{description}</Typography>
				</Box>
			</CardContent>

			<CardActions>
				<Button size="small" onClick={handleEditTransaction}>
					Edit
				</Button>
				<Button size="small" onClick={handleTransactionDelete}>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}

export default Transaction;
