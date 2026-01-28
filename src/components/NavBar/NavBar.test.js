import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('renders navbar with logo and navigation items', () => {
    render(<NavBar />);
    const logo = screen.getByAltText('CarWale Logo');
    expect(logo).toBeInTheDocument();
    expect(screen.getByText('USED CARS')).toBeInTheDocument();
    expect(screen.getByText('NEW CARS')).toBeInTheDocument();
  });

  it('renders navbar structure with required sections', () => {
    const { container } = render(<NavBar />);
    expect(container.querySelector('.carwale-navbar')).toBeInTheDocument();
    expect(container.querySelector('.navbar-container')).toBeInTheDocument();
    expect(container.querySelector('.navbar-logo')).toBeInTheDocument();
    expect(container.querySelector('.navbar-links')).toBeInTheDocument();
  });

  it('renders search and icon sections', () => {
    const { container } = render(<NavBar />);
    expect(container.querySelector('.navbar-actions')).toBeInTheDocument();
    expect(container.querySelector('.search-container')).toBeInTheDocument();
    expect(container.querySelector('.navbar-icons')).toBeInTheDocument();
  });

  it('renders search input with proper attributes', () => {
    const { container } = render(<NavBar />);
    const searchInput = container.querySelector('.search-container input');
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  it('renders location and user icons', () => {
    const { container } = render(<NavBar />);
    expect(container.querySelector('.location-icon')).toBeInTheDocument();
    expect(container.querySelector('.user-icon')).toBeInTheDocument();
  });
});
