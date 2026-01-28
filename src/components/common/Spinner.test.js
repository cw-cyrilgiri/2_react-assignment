import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders spinner overlay and loading spinner', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.spinner-overlay')).toBeInTheDocument();
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
