import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import { openDrawer } from 'reducers/drawerReducer';

import AddTransactionForm from './components/addTransactionForm';
import Transactions from './components/transactions';
import Summary from './components/summary';

function Home() {
	const dispatch = useDispatch();

	const handleAddTransaction = () => {
		dispatch(openDrawer({ component: <AddTransactionForm /> }));
	};

	return (
		<Container maxWidth="xl">
			<Grid container my={3}>
				<Grid item xs={12} md={7}>
					<Box mb={2}>
						<Typography variant="h5" gutterBottom>
							Track your expense! 💸
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

					<Summary />
				</Grid>

				<Grid
					item
					xs={12}
					md={5}
					px={{ md: 2 }}
					sx={{
						height: { md: '80vh' },
						overflowY: { md: 'scroll' },
					}}>
					<Transactions />
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
