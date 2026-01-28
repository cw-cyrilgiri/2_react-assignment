import React from 'react';
import { render } from '@testing-library/react';
import BudgetFilter from './BudgetFilter';

describe('BudgetFilter', () => {
  it('renders without crashing', () => {
    const { container } = render(<BudgetFilter />);
    expect(container).toBeTruthy();
  });
});
