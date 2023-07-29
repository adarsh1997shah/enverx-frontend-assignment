import React from 'react';
import { Box, Button, Container, Drawer, Typography } from '@mui/material';

import AddTransactionForm from './components/addTransactionForm';
import { closeDrawer, openDrawer } from 'reducers/drawerReducer';
import { useDispatch, useSelector } from 'react-redux';

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
			<Box>
				<Typography>Some description</Typography>
			</Box>

			<Box>
				<Button variant="contained" onClick={handleDrawerToggle(true)}>
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
		</Container>
	);
}

export default Home;
