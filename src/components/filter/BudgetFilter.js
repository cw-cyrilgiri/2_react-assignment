import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UI_MAX = 50;

function BudgetFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const budget = searchParams.get("budget"); // "10-30" or "0-"
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(UI_MAX);

  // Sync FROM URL → UI
  useEffect(() => {
    if (!budget) return;

    const [bMin, bMax] = budget.split("-");
    setMin(Number(bMin || 0));
    setMax(bMax ? Number(bMax) : UI_MAX);
  }, [budget]);

  const apply = (newMin, newMax) => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "budget",
      `${newMin}-${newMax === UI_MAX ? "" : newMax}`
    );
    setSearchParams(params);
  };

  return (
    <div>
      {/* Min */}
      <input
        type="range"
        min={0}
        max={UI_MAX}
        value={min}
        onChange={(e) => {
          const v = Number(e.target.value);
          setMin(v);
          apply(v, max);
        }}
      />

      {/* Max */}
      <input
        type="range"
        min={min}
        max={UI_MAX}
        value={max}
        onChange={(e) => {
          const v = Number(e.target.value);
          setMax(v);
          apply(min, v);
        }}
      />

      <div>
        ₹ {min}L – {max === UI_MAX ? "Max" : `${max}L`}
      </div>
    </div>
  );
}

export default BudgetFilter;
