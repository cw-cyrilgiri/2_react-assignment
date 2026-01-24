import { useSearchParams } from "react-router-dom";

function CityFilter({ cities }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCity = searchParams.get("city");

  const onChange = (cityId) => {
    const next = new URLSearchParams(searchParams);
    next.set("city", cityId);
    setSearchParams(next);
  };

  return (
    <div>
      {cities.map((city) => (
        <label key={city.CityId}>
          <input
            type="radio"
            checked={selectedCity === String(city.CityId)}
            onChange={() => onChange(city.CityId)}
          />
          {city.CityName}
        </label>
      ))}
    </div>
  );
}

export default CityFilter;
