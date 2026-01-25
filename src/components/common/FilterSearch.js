import './FilterSearch.css';
import magnifierIco from '../../assets/magnifier.svg'

const FilterSearch = ({ placeholder, onChange, value }) => (
  <div className="filter-search-wrapper">
    <input
      type="text"
      className="filter-search-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <span className="search-icon"><img src={magnifierIco} alt="search" /></span>
  </div>
);

export default FilterSearch;
