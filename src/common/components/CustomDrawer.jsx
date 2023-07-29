import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@mui/material';

import { closeDrawer } from 'reducers/drawerReducer';

function CustomDrawer() {
	const dispatch = useDispatch();
	const { isOpen = false, children = null } = useSelector(({ drawer }) => drawer);

	const handleDrawerClose = (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		dispatch(closeDrawer());
	};

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={handleDrawerClose}
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
