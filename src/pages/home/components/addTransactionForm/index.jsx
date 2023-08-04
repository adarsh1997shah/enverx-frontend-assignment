import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';

import { commonDrawerStyles } from 'common/components/CustomDrawer';

import { CATEGORY_OPTIONS } from 'pages/home/constants';

import { CREATE_TRANSACTION, EDIT_TRANSACTION } from 'actions/transactionActionTypes';

import { closeDrawer } from 'reducers/drawerReducer';

import { INITIAL_TRANSACTION } from './constants';
import { shouldNotSubmitForm } from './utils';
import Amount from 'common/components/InputFields/Amount';

function AddTransactionForm({ editTransaction }) {
	const [transaction, setTransaction] = useState(editTransaction || INITIAL_TRANSACTION);

	const dispatch = useDispatch();
	const { isTransactionEditCreateLoading } = useSelector(
		({ transactions }) => transactions
	);

	const { transactionType, category, date, amount, description } = transaction;

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		setTransaction({ ...transaction, [name]: value });
	};

	const handleDateChange = (value) => {
		const customEvent = { target: { name: 'date', value } };

		handleFormChange(customEvent);
	};

	const handleSave = () => {
		if (editTransaction?.id) {
			dispatch({ type: EDIT_TRANSACTION, payload: transaction });
		} else {
			dispatch({ type: CREATE_TRANSACTION, payload: transaction });
		}
	};

	const onSelectOptionClose = () => {
		setTimeout(() => {
			document.activeElement.blur();
		}, 0);
	};

	return (
		<Box sx={commonDrawerStyles}>
			<Box>
				<FormControl
					margin="normal"
					fullWidth
					required
					disabled={isTransactionEditCreateLoading}>
					<FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
					<RadioGroup
						name="transactionType"
						value={transactionType}
						onChange={handleFormChange}>
						<FormControlLabel value="expense" control={<Radio />} label="Expense" />
						<FormControlLabel value="income" control={<Radio />} label="Income" />
					</RadioGroup>
				</FormControl>

				<FormControl
					margin="normal"
					fullWidth
					variant="standard"
					required
					disabled={isTransactionEditCreateLoading}>
					<InputLabel>Select Category</InputLabel>
					<Select
						name="category"
						onChange={handleFormChange}
						value={category}
						onClose={onSelectOptionClose}>
						{CATEGORY_OPTIONS[transactionType].map(({ value, label }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<DatePicker
					label="Select Date"
					slotProps={{ textField: { variant: 'standard', required: true } }}
					sx={{ width: '100%' }}
					required
					name="date"
					value={date}
					disableFuture
					format="DD-MM-YYYY"
					onChange={handleDateChange}
					disabled={isTransactionEditCreateLoading}
				/>

				<Amount
					label="Amount"
					name="amount"
					variant="standard"
					margin="normal"
					fullWidth
					required
					value={amount}
					onChange={handleFormChange}
				/>

				<TextField
					label="Description"
					name="description"
					variant="standard"
					multiline
					maxRows={4}
					margin="normal"
					fullWidth
					required
					onChange={handleFormChange}
					value={description}
					disabled={isTransactionEditCreateLoading}
				/>
			</Box>

			<Box>
				<Button
					variant="outlined"
					sx={{ mr: 1, my: 2 }}
					onClick={() => dispatch(closeDrawer())}
					disabled={isTransactionEditCreateLoading}>
					Cancel
				</Button>
				<Button
					variant="contained"
					disabled={isTransactionEditCreateLoading || shouldNotSubmitForm(transaction)}
					onClick={handleSave}>
					Save
				</Button>
			</Box>
		</Box>
	);
}

export default AddTransactionForm;
