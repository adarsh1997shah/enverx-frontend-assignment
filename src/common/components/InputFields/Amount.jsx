import React from 'react';
import { TextField } from '@mui/material';

function Amount({ onChange = () => {}, value, ...rest }) {
	const handleAmount = (e) => {
		const { value, name } = e.target;

		const amountWithoutPrefix = value.replace('₹', '').trim();

		if (amountWithoutPrefix === '' || !isNaN(amountWithoutPrefix)) {
			onChange({ target: { name, value: amountWithoutPrefix } });
		}
	};

	return (
		<TextField onChange={handleAmount} value={value ? `₹ ${value}` : ''} {...rest} />
	);
}

export default Amount;
