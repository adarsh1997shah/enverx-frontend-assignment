import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import { openDrawer } from 'reducers/drawerReducer';

import AddTransactionForm from './components/addTransactionForm';
import Transactions from './components/transactions';

function Home() {
	const dispatch = useDispatch();

	const handleAddTransaction = () => {
		dispatch(openDrawer({ component: <AddTransactionForm /> }));
	};

	return (
		<Container maxWidth="lg">
			<Grid container my={3}>
				<Grid item xs={12} md={6}>
					<Box mb={2}>
						<Typography variant="h5" gutterBottom>
							Track your transactions! 💸
						</Typography>
						<Typography variant="body1">
							Keeping track of your expenses is an important part of managing your overall
							finances.
						</Typography>
					</Box>

					<Box>
						<Button
							variant="contained"
							onClick={handleAddTransaction}
							sx={{ width: { xs: '100%', md: 'auto' } }}>
							Add Transaction
						</Button>
					</Box>
				</Grid>

				<Grid
					item
					xs={12}
					md={6}
					px={{ md: 2 }}
					sx={{ minHeight: { md: '80vh' }, overflowY: { md: 'scroll' } }}>
					<Transactions />
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
