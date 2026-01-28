import React from 'react';
import { render, screen } from '@testing-library/react';
import CarCard from './CarCard';
import '@testing-library/jest-dom';

describe('CarCard Component', () => {
  const mockCar = {
    profileId: '1',
    carName: 'Civic',
    makeYear: 2020,
    km: 45000,
    fuel: 'Petrol',
    areaName: 'Bangalore',
    cityName: 'Karnataka',
    price: 850000,
    stockImages: ['image1.jpg', 'image2.jpg'],
  };

  it('should render car name with year', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText(/2020 Civic/)).toBeInTheDocument();
  });

  it('should display car kilometers', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText(/45000 km/)).toBeInTheDocument();
  });

  it('should display fuel type', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText(/Petrol/)).toBeInTheDocument();
  });

  it('should display area and city name', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText(/Bangalore, Karnataka/)).toBeInTheDocument();
  });

  it('should display price with rupee symbol', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText(/₹ 850000/)).toBeInTheDocument();
  });

  it('should have get seller details button', () => {
    render(<CarCard car={mockCar} />);
    expect(screen.getByText('Get Seller Details')).toBeInTheDocument();
  });

  it('should have correct CSS class', () => {
    const { container } = render(<CarCard car={mockCar} />);
    expect(container.querySelector('.CarCard')).toBeInTheDocument();
  });

  it('should render ImageCarousel component', () => {
    const { container } = render(<CarCard car={mockCar} />);
    expect(container.querySelector('.carousel')).toBeInTheDocument();
  });

  it('should pass stock images to ImageCarousel', () => {
    render(<CarCard car={mockCar} />);
    const img = screen.getByAltText('car-0');
    expect(img).toHaveAttribute('src', 'image1.jpg');
  });

  it('should have car-text container', () => {
    const { container } = render(<CarCard car={mockCar} />);
    expect(container.querySelector('.Car-text')).toBeInTheDocument();
  });

  it('should have car-info container', () => {
    const { container } = render(<CarCard car={mockCar} />);
    expect(container.querySelector('.Car-info')).toBeInTheDocument();
  });

  it('should display separators in car info', () => {
    const { container } = render(<CarCard car={mockCar} />);
    const separators = container.querySelectorAll('.Car-info span');
    expect(separators.length).toBe(2); // Two pipe separators
  });

  it('should have title attribute on car name', () => {
    const { container } = render(<CarCard car={mockCar} />);
    const heading = container.querySelector('.Car-text h2');
    expect(heading).toHaveAttribute('title', 'Civic');
  });

  it('should handle high prices correctly', () => {
    const expensiveCar = { ...mockCar, price: 5000000 };
    render(<CarCard car={expensiveCar} />);
    expect(screen.getByText(/₹ 5000000/)).toBeInTheDocument();
  });

  it('should handle zero kilometers', () => {
    const newCar = { ...mockCar, km: 0 };
    render(<CarCard car={newCar} />);
    expect(screen.getByText(/0 km/)).toBeInTheDocument();
  });

  it('should have seller button with correct class', () => {
    const { container } = render(<CarCard car={mockCar} />);
    expect(container.querySelector('.seller-btn')).toBeInTheDocument();
  });
});
