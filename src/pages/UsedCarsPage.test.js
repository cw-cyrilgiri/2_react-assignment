import React from 'react';
import { render } from '@testing-library/react';
import UsedCarsPage from './UsedCarsPage';

describe('UsedCarsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<UsedCarsPage />);
    expect(container).toBeTruthy();
  });
});
