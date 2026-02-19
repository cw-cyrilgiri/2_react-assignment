import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import FilterSearch from '../common/FilterSearch';
import './CityFilter.css';

function CityFilter({ cities = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 300);
  const selectedCity = searchParams.get('city');

  const onChange = (cityId) => {
    const next = new URLSearchParams(searchParams);
    next.set('city', cityId);
    setSearchParams(next);
  };

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.cityName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, cities]);

  return (
    <div className="city-filter-container">
      <FilterSearch
        placeholder="Search City"
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <div className="city-list-wrapper">
        {filteredCities.map((city) => (
          <label
            key={city.cityId}
            className={`city-pill ${selectedCity === String(city.cityId) ? 'active' : ''}`}
          >
            <input
              type="radio"
              name="city"
              checked={selectedCity === String(city.cityId)}
              onChange={() => onChange(city.cityId)}
            />
            {city.cityName}
          </label>
        ))}
      </div>
      {filteredCities.length === 0 && (
        <p className="no-results-text">No City found</p>
      )}
    </div>
  );
}

export default CityFilter;
