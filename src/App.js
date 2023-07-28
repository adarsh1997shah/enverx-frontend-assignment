import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import NavBar from 'common/components/Navbar';

import Home from 'pages/home';

function App() {
	return (
		<div className="App">
			<NavBar />

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Home />
			</LocalizationProvider>
		</div>
	);
}

export default App;
