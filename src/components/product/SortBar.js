import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price - Low to High", value: "priceNumeric-asc" },
  { label: "Price - High to Low", value: "priceNumeric-desc" },
  { label: "Year - Newest to Oldest", value: "makeYear-desc" },
  { label: "Year - Oldest to Newest", value: "makeYear-asc" },
];

function SortBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") ?? "";

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setSearchParams(params, { replace: true });
  };

  return (
    <div className="sort-bar">
      <span>Sort By:</span>

      <select
        value={sortValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBar;
