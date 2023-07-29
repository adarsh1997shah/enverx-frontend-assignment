import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfirmProvider } from 'material-ui-confirm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CustomSnackbar from 'common/components/CustomSnackbar';
import CustomDrawer from 'common/components/CustomDrawer';

import store from 'store';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<CustomSnackbar />
				<CustomDrawer />
				<ConfirmProvider>
					<App />
				</ConfirmProvider>
			</LocalizationProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
