import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { lime } from '@mui/material/colors';

import Transaction from './components/Transaction';

function Transactions() {
	const { data } = useSelector(({ transactions }) => transactions);

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
				<Transaction
					key={transaction.date.valueOf()}
					transaction={transaction}
					index={index}
				/>
			))}
		</Box>
	);
}

export default Transactions;
