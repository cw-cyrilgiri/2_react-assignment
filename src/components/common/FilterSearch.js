import './FilterSearch.css';

const FilterSearch = ({ placeholder, onChange, value }) => (
  <div className="filter-search-wrapper">
    <input
      type="text"
      className="filter-search-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <span className="search-icon">🔍</span>
  </div>
);

export default FilterSearch;
