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
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';

function AddTransactionForm({ handleDrawerToggle }) {
	return (
		<>
			<Box>
				<FormControl margin="normal" fullWidth>
					<FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="expense"
						name="radio-buttons-group">
						<FormControlLabel value="income" control={<Radio />} label="Income" />
						<FormControlLabel value="expense" control={<Radio />} label="Expense" />
					</RadioGroup>
				</FormControl>

				<FormControl margin="normal" fullWidth variant="standard">
					<InputLabel id="demo-simple-select-label">Select Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						value=""
						label="Age"
						// onChange={handleChange}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>

				<DatePicker
					label="Select Date"
					slotProps={{ textField: { variant: 'standard' } }}
					sx={{ width: '100%' }}
				/>

				<TextField
					label="Amount"
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
					fullWidth
					margin="normal"
					variant="standard"
				/>

				<TextField
					label="Description"
					variant="standard"
					multiline
					maxRows={4}
					margin="normal"
					fullWidth
				/>
			</Box>

			<Box>
				<Button
					variant="outlined"
					sx={{ mr: 1, my: 2 }}
					onClick={handleDrawerToggle(false)}>
					Cancel
				</Button>
				<Button variant="contained">Save</Button>
			</Box>
		</>
	);
}

export default AddTransactionForm;
