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
import { useDispatch } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';

import { CREATE_TRANSACTION } from 'actions/transactionActionTypes';

import { CATEGORY_OPTIONS, INITIAL_TRANSACTION } from './constants';
import { shouldNotSubmitForm } from './utils';

function AddTransactionForm({ handleDrawerToggle }) {
	const [transaction, setTransaction] = useState(INITIAL_TRANSACTION);

	const dispatch = useDispatch();

	const { transactionType, category, date, amount, description } = transaction;

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		setTransaction({ ...transaction, [name]: value });
	};

	const handleAmount = (e) => {
		const { value, name } = e.target;

		const amountWithoutPrefix = value.trim().replace('₹ ', '');

		if (!isNaN(amountWithoutPrefix)) {
			handleFormChange({ target: { name, value: amountWithoutPrefix } });
		}
	};

	const handleDateChange = (value) => {
		const customEvent = { target: { name: 'date', value } };

		handleFormChange(customEvent);
	};

	const handleSave = () => {
		dispatch({ type: CREATE_TRANSACTION, payload: transaction });
	};

	return (
		<>
			<Box>
				<FormControl margin="normal" fullWidth required>
					<FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
					<RadioGroup
						name="transactionType"
						value={transactionType}
						onChange={handleFormChange}>
						<FormControlLabel value="expense" control={<Radio />} label="Expense" />
						<FormControlLabel value="income" control={<Radio />} label="Income" />
					</RadioGroup>
				</FormControl>

				<FormControl margin="normal" fullWidth variant="standard" required>
					<InputLabel>Select Category</InputLabel>
					<Select name="category" onChange={handleFormChange} value={category}>
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
				/>

				<TextField
					label="Amount"
					name="amount"
					fullWidth
					margin="normal"
					variant="standard"
					required
					onChange={handleAmount}
					value={amount ? `₹ ${amount}` : ''}
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
				/>
			</Box>

			<Box>
				<Button
					variant="outlined"
					sx={{ mr: 1, my: 2 }}
					onClick={handleDrawerToggle(false)}>
					Cancel
				</Button>
				<Button
					variant="contained"
					disabled={shouldNotSubmitForm(transaction)}
					onClick={handleSave}>
					Save
				</Button>
			</Box>
		</>
	);
}

export default AddTransactionForm;
