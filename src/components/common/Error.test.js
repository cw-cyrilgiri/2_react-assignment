import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error', () => {
  it('renders error message', () => {
    const errorMessage = 'Something went wrong';
    render(<Error error={errorMessage} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('applies error-box CSS class', () => {
    const { container } = render(<Error error="Test error" />);
    expect(container.querySelector('.error-box')).toBeInTheDocument();
  });
});
