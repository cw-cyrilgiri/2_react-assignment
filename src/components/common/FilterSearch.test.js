import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSearch from './FilterSearch';

describe('FilterSearch', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders input field with placeholder', () => {
    render(
      <FilterSearch
        placeholder="Search cars"
        onChange={mockOnChange}
        value=""
      />,
    );
    expect(screen.getByPlaceholderText('Search cars')).toBeInTheDocument();
  });

  it('displays current value and updates on change', () => {
    const { rerender } = render(
      <FilterSearch placeholder="Search" onChange={mockOnChange} value="" />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    rerender(
      <FilterSearch
        placeholder="Search"
        onChange={mockOnChange}
        value="Honda"
      />,
    );
    expect(input).toHaveValue('Honda');
  });

  it('calls onChange when input value changes', () => {
    render(
      <FilterSearch placeholder="Search" onChange={mockOnChange} value="" />,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Toyota' } });
    expect(mockOnChange).toHaveBeenCalledWith('Toyota');
  });

  it('renders search icon and has correct classes', () => {
    const { container } = render(
      <FilterSearch placeholder="Search" onChange={mockOnChange} value="" />,
    );
    expect(container.querySelector('.search-icon')).toBeInTheDocument();
    expect(
      container.querySelector('.filter-search-wrapper'),
    ).toBeInTheDocument();
    expect(container.querySelector('.filter-search-input')).toBeInTheDocument();
  });
});
