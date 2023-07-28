import React, { useState } from 'react';
import { Box, Button, Container, Drawer, Typography } from '@mui/material';

import AddTransactionForm from './components/addTransactionForm';

function Home() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerToggle = (value) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setIsDrawerOpen(value);
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
					open={isDrawerOpen}
					onClose={handleDrawerToggle(false)}
					sx={{
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: { xs: '90%', md: '45%' },
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
