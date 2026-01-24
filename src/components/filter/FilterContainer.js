import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import filterIcon from "../../assets/filter.svg";
import { fetchMetadata } from "../../redux/data/data.thunk";
import FilterAccordian from "../accordian/FilterAccordian";
import FuelFilter from "./FuelFilter";
import CityFilter from "./CityFilter";
import MakeFilter from "./MakeFilter";
import BudgetFilter from "./BudgetFilter";
import "./Filter.css";

function FilterContainer() {
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();

  const { makes, cities, metadataLoaded } = useSelector((state) => state.data);

  useEffect(() => {
    if (!metadataLoaded) {
      dispatch(fetchMetadata());
    }
  }, [dispatch, metadataLoaded]);

  const handleClearAll = () => {
    setSearchParams({});
  };

  return (
    <aside className="FilterContainer">
      {/* Header - Fixed at top */}
      <div className="filter-header">
        <div className="filter-header-left">
          <img src={filterIcon} alt="Filter Icon" />
          <h2>Filters</h2>
        </div>

        <button
          type="button"
          onClick={handleClearAll}
          className="clear-all-btn"
        >
          Clear All
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="filter-content-scroll">
        <FilterAccordian title="Fuel">
          <FuelFilter />
        </FilterAccordian>

        <FilterAccordian title="City">
          <CityFilter cities={cities} />
        </FilterAccordian>

        <FilterAccordian title="Make / Model">
          <MakeFilter makes={makes} />
        </FilterAccordian>

        <FilterAccordian title="Budget">
          <BudgetFilter />
        </FilterAccordian>
      </div>
    </aside>
  );
}

export default FilterContainer;