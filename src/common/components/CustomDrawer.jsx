import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@mui/material';

import { closeDrawer, openDrawer } from 'reducers/drawerReducer';

function CustomDrawer({ children }) {
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
			{children}
		</Drawer>
	);
}

export default CustomDrawer;
