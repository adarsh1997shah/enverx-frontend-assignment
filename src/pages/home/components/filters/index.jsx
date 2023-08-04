import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { commonDrawerStyles } from 'common/components/CustomDrawer';
import Amount from 'common/components/InputFields/Amount';

import { closeDrawer } from 'reducers/drawerReducer';
import { getFilteredTransactions } from 'reducers/transactionReducer';

import { TRANSACTION_TYPES } from 'pages/home/constants';

const INITIAL_FILTERS = {
	transactionType: '',
	from: null,
	to: null,
	minAmount: '',
	maxAmount: '',
};

function Filters() {
	const [filters, setFilters] = useState(INITIAL_FILTERS);

	const dispatch = useDispatch();
	const { data: transactions } = useSelector(({ transactions }) => transactions);

	const { transactionType, from, to, minAmount, maxAmount } = filters;

	const handleFiltersChange = (e) => {
		const { name, value } = e.target;

		setFilters({ ...filters, [name]: value });
	};

	const handleDateChange = (name) => (value) => {
		const customEvent = { target: { name, value } };

		handleFiltersChange(customEvent);
	};

	const errors = useMemo(() => {
		const { from, to, minAmount, maxAmount } = filters;

		const errors = {};

		if (!from && to) {
			errors.from = 'Please enter from date';
		} else if (from && from.isAfter(to)) {
			errors.to = 'Please enter to date greater that from date';
		}

		if (minAmount && maxAmount && Number(maxAmount) < Number(minAmount)) {
			errors.maxAmount = 'Please enter max amount greater than min amount';
		}

		return errors;
	}, [filters]);

	const handleApply = () => {
		if (Object.keys(errors).length > 0) {
			return;
		}

		const filteredTransactions = transactions.filter((item) => {
			return (
				(transactionType ? transactionType === item.transactionType : true) &&
				Number(item.amount) >= Number(minAmount) &&
				(Number(maxAmount) ? Number(item.amount) <= Number(maxAmount) : true) &&
				(from ? item.date.isAfter(from.subtract(1, 'day'), 'day') : true) &&
				(to ? item.date.isBefore(to.add(1, 'day'), 'day') : true)
			);
		});

		dispatch(getFilteredTransactions(filteredTransactions));
		dispatch(closeDrawer());
	};

	const handleClearFilter = () => {
		setFilters(INITIAL_FILTERS);

		dispatch(getFilteredTransactions());
		dispatch(closeDrawer());
	};

	const handleCloseDrawer = () => dispatch(closeDrawer());

	return (
		<Box sx={commonDrawerStyles}>
			<Box>
				<FormControl margin="normal" fullWidth>
					<FormLabel id="demo-radio-buttons-group-label">Transaction Type</FormLabel>
					<RadioGroup
						name="transactionType"
						value={transactionType}
						onChange={handleFiltersChange}>
						<FormControlLabel value="" control={<Radio />} label="All" />

						{TRANSACTION_TYPES.map(({ label, value }) => (
							<FormControlLabel
								key={label}
								value={value}
								control={<Radio />}
								label={label}
							/>
						))}
					</RadioGroup>
				</FormControl>

				<Box display="flex" gap={4} mt={1}>
					<DatePicker
						label="Select From"
						name="from"
						value={from}
						onChange={handleDateChange('from')}
						disableFuture
						format="DD-MM-YYYY"
						sx={{ width: '100%' }}
						slotProps={{
							textField: {
								variant: 'standard',
								error: Boolean(errors.from),
								helperText: errors.from,
								required: Boolean(to),
							},
						}}
					/>

					<DatePicker
						label="Select To"
						name="to"
						value={to}
						onChange={handleDateChange('to')}
						disableFuture
						format="DD-MM-YYYY"
						sx={{ width: '100%' }}
						slotProps={{
							textField: {
								variant: 'standard',
								error: Boolean(errors.to),
								helperText: errors.to,
								required: Boolean(to),
							},
						}}
						minDate={from}
					/>
				</Box>

				<Box display="flex" gap={4}>
					<Amount
						label="Min Amount"
						name="minAmount"
						variant="standard"
						margin="normal"
						fullWidth
						value={minAmount}
						onChange={handleFiltersChange}
					/>

					<Amount
						label="Max Amount"
						name="maxAmount"
						variant="standard"
						margin="normal"
						fullWidth
						value={maxAmount}
						onChange={handleFiltersChange}
						error={Boolean(errors.maxAmount)}
						helperText={errors.maxAmount}
					/>
				</Box>
			</Box>

			<Box>
				<Button variant="outlined" sx={{ mr: 1, my: 2 }} onClick={handleCloseDrawer}>
					Cancel
				</Button>
				<Button variant="outlined" sx={{ mr: 1, my: 2 }} onClick={handleClearFilter}>
					Clear
				</Button>
				<Button
					variant="contained"
					onClick={handleApply}
					disabled={Object.keys(errors).length > 0}>
					Apply
				</Button>
			</Box>
		</Box>
	);
}

export default Filters;
