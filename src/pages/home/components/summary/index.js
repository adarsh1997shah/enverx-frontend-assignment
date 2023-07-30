import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { green } from '@mui/material/colors';

import { getCategoryLabel } from 'pages/home/components/transactions/utils';
import { TRANSACTION_TYPES } from 'pages/home/components/addTransactionForm/constants';

function Summary() {
	const { data } = useSelector(({ transactions }) => transactions);

	const summary = useMemo(
		() =>
			data.reduce(
				(acc, curr) => {
					const { transactionType, category, amount } = curr;

					if (acc[transactionType][category]) {
						acc[transactionType][category] += Number(amount);
					} else {
						acc[transactionType][category] = Number(amount);
					}

					return acc;
				},
				{ expense: {}, income: {} }
			),
		[data]
	);

	return (
		<Box mt={4}>
			{TRANSACTION_TYPES.map(({ label, value: transactionType }) => (
				<Box
					mb={2}
					bgcolor={green[50]}
					p={1}
					sx={{ minHeight: 100 }}
					borderRadius={1}
					key={transactionType}>
					<Typography variant="h5">{label}s</Typography>

					{Object.keys(summary[transactionType]).length === 0 ? (
						<Typography textAlign="center" mt={1} variant="body2">
							No {label}s yet!
						</Typography>
					) : (
						<Grid container my={1}>
							{Object.entries(summary[transactionType]).map(([key, amount]) => (
								<Grid item md={4} lg={3} key={key}>
									<Card sx={{ mr: 1, mb: 1 }}>
										<CardHeader
											title={`₹ ${new Intl.NumberFormat('en-IN').format(amount)}`}
											subheader={getCategoryLabel({
												transactionType,
												category: key,
											})}
										/>
									</Card>
								</Grid>
							))}
						</Grid>
					)}
				</Box>
			))}
		</Box>
	);
}

export default Summary;
