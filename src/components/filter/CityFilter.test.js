import React from 'react';
import { render } from '@testing-library/react';
import CityFilter from './CityFilter';

describe('CityFilter', () => {
  it('renders without crashing', () => {
    const cities = [
      { cityId: 1, cityName: 'Bangalore' },
      { cityId: 2, cityName: 'Mumbai' },
    ];
    const { container } = render(<CityFilter cities={cities} />);
    expect(container).toBeTruthy();
  });
});
