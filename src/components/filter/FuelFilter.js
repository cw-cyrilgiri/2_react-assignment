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
  const selected = getArrayParam(searchParams, "fuel");

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);

    const params = new URLSearchParams(searchParams);
    setArrayParam(params, "fuel", [...next]);
    setSearchParams(params);
  };

  return (
    <div>
      {FUEL_TYPES.map((fuel) => (
        <label key={fuel.id}>
          <input
            type="checkbox"
            checked={selected.includes(fuel.id)}
            onChange={() => toggle(fuel.id)}
          />
          {fuel.label}
        </label>
      ))}
    </div>
  );
}

export default FuelFilter;
