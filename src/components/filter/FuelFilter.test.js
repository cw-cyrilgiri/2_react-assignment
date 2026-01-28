import React from 'react';
import { render } from '@testing-library/react';
import FuelFilter from './FuelFilter';

describe('FuelFilter', () => {
  it('renders without crashing', () => {
    const { container } = render(<FuelFilter />);
    expect(container).toBeTruthy();
  });
});
