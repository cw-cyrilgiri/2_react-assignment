import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import filterIcon from "../../assets/filter.svg";

import { fetchMetadata } from "../../redux/data/data.thunk";

import FilterAccordian from "../accordian/FilterAccordian";
import FuelFilter from "./FuelFilter";
import CityFilter from "./CityFilter";
import MakeFilter from "./MakeFilter";
import BudgetFilter from "./BudgetFilter";

function FilterContainer({ onClear }) {
  const dispatch = useDispatch();
  const { makes, cities, metadataLoaded } = useSelector(
    (state) => state.data
  );

  /* ===============================
     FETCH METADATA ONCE
  =============================== */
  useEffect(() => {
    if (!metadataLoaded) {
      dispatch(fetchMetadata());
    }
  }, [dispatch, metadataLoaded]);

  return (
    <div className="FilterContainer">
      <div className="filter-header">
        <img src={filterIcon} alt="filter" />
        <h2>Filters</h2>
        {onClear && <button onClick={onClear}>Clear All</button>}
      </div>

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
  );
}

export default FilterContainer;
