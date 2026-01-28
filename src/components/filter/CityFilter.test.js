import React from 'react';
import { render } from '@testing-library/react';
import CityFilter from './CityFilter';

describe('CityFilter', () => {
  it('renders without crashing', () => {
    const cities = [
      { CityId: 1, CityName: 'Bangalore' },
      { CityId: 2, CityName: 'Mumbai' },
    ];
    const { container } = render(<CityFilter cities={cities} />);
    expect(container).toBeTruthy();
  });
});
