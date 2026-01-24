import FilterContainer from "../components/filter/FilterContainer";
import ProductContainer from "../components/product/ProductContainer";

function UsedCarsPage() {
  return (
    <div className="used-cars-page">
      <FilterContainer />
      <ProductContainer />
    </div>
  );
}

export default UsedCarsPage;
