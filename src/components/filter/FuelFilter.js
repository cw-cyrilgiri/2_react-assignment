import { useSearchParams } from "react-router-dom";
import { getArrayParam, setArrayParam } from "../../utils/query";

const FUEL_TYPES = [
  { id: 1, label: "Petrol" },
  { id: 2, label: "Diesel" },
  { id: 3, label: "CNG" },
  { id: 4, label: "LPG" },
  { id: 5, label: "Electric" },
  { id: 6, label: "Hybrid" },
];

function FuelFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // getArrayParam ensures we get an array of IDs from the URL
  const selected = getArrayParam(searchParams, "fuel").map(Number);

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    const params = new URLSearchParams(searchParams);
    setArrayParam(params, "fuel", [...next]);
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