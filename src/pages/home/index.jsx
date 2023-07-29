import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Drawer, Grid, Typography } from '@mui/material';

import { closeDrawer, openDrawer } from 'reducers/drawerReducer';

import AddTransactionForm from './components/addTransactionForm';
import Transactions from './components/transactions';

function Home() {
	const dispatch = useDispatch();
	const { isOpen } = useSelector(({ drawer }) => drawer);

	const handleDrawerToggle = (value) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		if (value) {
			dispatch(openDrawer());
		} else {
			dispatch(closeDrawer());
		}
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
							onClick={handleDrawerToggle(true)}
							sx={{ width: { xs: '100%', md: 'auto' } }}>
							Add Transaction
						</Button>

						<Drawer
							anchor="right"
							open={isOpen}
							onClose={handleDrawerToggle(false)}
							sx={{
								'& .MuiDrawer-paper': {
									boxSizing: 'border-box',
									width: { xs: '90%', sm: '55%', md: '45%', lg: '30%' },
									p: 2,
								},
							}}>
							<AddTransactionForm handleDrawerToggle={handleDrawerToggle} />
						</Drawer>
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
