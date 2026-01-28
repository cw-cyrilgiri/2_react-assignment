import React from 'react';
import { render } from '@testing-library/react';
import MakeFilter from './MakeFilter';

describe('MakeFilter', () => {
  it('renders without crashing', () => {
    const makes = [
      { makeId: 1, makeName: 'Honda' },
      { makeId: 2, makeName: 'Toyota' },
    ];
    const { container } = render(<MakeFilter makes={makes} />);
    expect(container).toBeTruthy();
  });
});
