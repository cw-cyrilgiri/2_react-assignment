import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArrayParam, setArrayParam } from '../../utils/query';
import { useDebounce } from '../../hooks/useDebounce';
import FilterSearch from '../common/FilterSearch';
import './MakeFilter.css';

function MakeFilter({ makes = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const selected = getArrayParam(searchParams, 'car');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const toggle = (id) => {
    const numericId = Number(id);
    const next = new Set(selected);

    if (next.has(numericId)) {
      next.delete(numericId);
    } else {
      next.add(numericId);
    }

    const params = new URLSearchParams(searchParams);
    setArrayParam(params, 'car', Array.from(next));
    setSearchParams(params);
  };

  const filteredMakes = makes.filter((make) =>
    make.makeName.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

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
              checked={selected.includes(Number(make.makeId))}
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
