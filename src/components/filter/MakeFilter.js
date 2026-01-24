import { useSearchParams } from "react-router-dom";
import { getArrayParam, setArrayParam } from "../../utils/query";

function MakeFilter({ makes }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = getArrayParam(searchParams, "car");

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);

    const params = new URLSearchParams(searchParams);
    setArrayParam(params, "car", [...next]);
    setSearchParams(params);
  };

  return (
    <div>
      {makes.map((make) => (
        <label key={make.makeId}>
          <input
            type="checkbox"
            checked={selected.includes(make.makeId)}
            onChange={() => toggle(make.makeId)}
          />
          {make.makeName}
        </label>
      ))}
    </div>
  );
}

export default MakeFilter;
