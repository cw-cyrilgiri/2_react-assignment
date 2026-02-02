import { useSearchParams } from 'react-router-dom';
import { getArrayParam, setArrayParam } from '../../utils/query';
import { FUEL_TYPES } from '../../utils/constants';
import './FuelFilter.css';

function FuelFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = getArrayParam(searchParams, 'fuel');

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    const params = new URLSearchParams(searchParams);
    setArrayParam(params, 'fuel', [...next]);
    setSearchParams(params);
  };

  return (
    <div className="fuel-filter-group">
      {FUEL_TYPES.map((fuel) => (
        <label key={fuel.id} className="filter-checkbox-label">
          <input
            type="checkbox"
            checked={selected.includes(fuel.id)}
            onChange={() => toggle(fuel.id)}
          />
          <span className="checkbox-text">{fuel.label}</span>
        </label>
      ))}
    </div>
  );
}

export default FuelFilter;
