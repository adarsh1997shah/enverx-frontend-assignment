import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import { lime } from '@mui/material/colors';

import { GET_TRANSACTIONS } from 'actions/transactionActionTypes';

import Transaction from './components/Transaction';

function Transactions() {
	const dispatch = useDispatch();
	const { data, isLoading } = useSelector(({ transactions }) => transactions);

	useEffect(() => {
		dispatch({ type: GET_TRANSACTIONS });
	}, []);

	if (isLoading) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="100%"
				bgcolor={lime[100]}
				borderRadius={1}>
				<CircularProgress color="inherit" />
			</Box>
		);
	}

	if (data.length === 0) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="100%"
				bgcolor={lime[100]}
				borderRadius={1}>
				<Typography>No transactions as of now</Typography>
			</Box>
		);
	}

	return (
		<Box>
			{data.map((transaction, index) => (
				<Transaction key={transaction.id} transaction={transaction} index={index} />
			))}
		</Box>
	);
}

export default Transactions;
