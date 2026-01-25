import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArrayParam, setArrayParam } from '../../utils/query';
import { useDebounce } from '../../hooks/useDebounce';
import FilterSearch from '../common/FilterSearch';
import './Filter.css';

function MakeFilter({ makes = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Get selected IDs from URL
  const selected = getArrayParam(searchParams, 'car');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const toggle = (id) => {
    const next = new Set(selected);
    // Ensure we compare strings/numbers correctly based on your data type
    const stringId = String(id);

    next.has(stringId) ? next.delete(stringId) : next.add(stringId);

    const params = new URLSearchParams(searchParams);
    setArrayParam(params, 'car', [...next]);
    setSearchParams(params);
  };

  // Filter the brand list based on search input
  const filteredMakes = useMemo(() => {
    return makes.filter((make) =>
      make.makeName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, makes]);

  return (
    <div className="make-filter-container">
      <FilterSearch
        placeholder="Search Make / Model"
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <div className="filter-list-wrapper">
        {filteredMakes.map((make) => (
          <label key={make.makeId} className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={selected.includes(String(make.makeId))}
              onChange={() => toggle(make.makeId)}
            />
            <span className="checkbox-text">{make.makeName}</span>
          </label>
        ))}
        {filteredMakes.length === 0 && (
          <p className="no-results-text">No brands found</p>
        )}
      </div>
    </div>
  );
}

export default MakeFilter;
