import { useSearchParams } from 'react-router-dom';
import './SortBar.css';

const SORT_OPTIONS = [
  { label: 'Best Match', value: '' },
  { label: 'Price - Low to High', value: 'price-asc' },
  { label: 'Price - High to Low', value: 'price-desc' },
  { label: 'Year - Newest to Oldest', value: 'year-desc' },
  { label: 'Year - Oldest to Newest', value: 'year-asc' },
];

function SortBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort') ?? '';

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="sort-bar-container">
      <div className="sort-controls">
        <span className="sort-label">Sort By:</span>
        <select
          className="sort-select"
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
    </div>
  );
}

export default SortBar;
