import React from 'react';
import { render } from '@testing-library/react';
import ProductContainer from './ProductContainer';

describe('ProductContainer', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProductContainer />);
    expect(container).toBeTruthy();
  });
});
