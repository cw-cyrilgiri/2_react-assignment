import React from 'react';
import { render } from '@testing-library/react';
import FilterContainer from './FilterContainer';

describe('FilterContainer', () => {
  it('renders without crashing', () => {
    const { container } = render(<FilterContainer />);
    expect(container).toBeTruthy();
  });
});
