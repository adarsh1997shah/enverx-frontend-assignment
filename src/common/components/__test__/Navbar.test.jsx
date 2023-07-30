import { render, screen } from '@testing-library/react';

import NavBar from 'common/components/Navbar';

const renderApp = () => {
	return render(<NavBar />);
};

describe('Navbar', () => {
	test('should be able to render navbar', () => {
		renderApp();

		expect(screen.getByText('Expense Tracker App')).toBeInTheDocument();
	});
});
