import React from 'react';
import { render, screen } from '@testing-library/react';
import SortBar from './SortBar';

describe('SortBar', () => {
  it('renders sort label and default options', () => {
    render(<SortBar />);
    expect(screen.getByText('Sort By:')).toBeInTheDocument();
    expect(screen.getByText('Best Match')).toBeInTheDocument();
    expect(screen.getByText('Price - Low to High')).toBeInTheDocument();
  });

  it('has empty default sort value', () => {
    render(<SortBar />);
    expect(screen.getByRole('combobox').value).toBe('');
  });
});
