import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import './Filter.css';

const UI_MAX = 50;

function BudgetFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const budgetParam = searchParams.get('budget') || '';

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(UI_MAX);

  useEffect(() => {
    if (!budgetParam) {
      setMin(0);
      setMax(UI_MAX);
      return;
    }
    const [bMin, bMax] = budgetParam.split('-');
    setMin(Number(bMin || 0));
    setMax(bMax ? Number(bMax) : UI_MAX);
  }, [budgetParam]);

  const debouncedMin = useDebounce(min, 400);
  const debouncedMax = useDebounce(max, 400);

  useEffect(() => {
    const currentUrlBudget = `${debouncedMin}-${debouncedMax === UI_MAX ? '' : debouncedMax}`;
    if (currentUrlBudget === budgetParam) return;

    const params = new URLSearchParams(searchParams);
    params.set('budget', currentUrlBudget);
    setSearchParams(params);
  }, [debouncedMin, debouncedMax, setSearchParams, budgetParam]);

  const getPercent = (value) => Math.round((value / UI_MAX) * 100);

  return (
    <div className="budget-filter-container">
      <div className="budget-input-row">
        <div className="input-group">
          <label>Min (Lakh)</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Math.min(Number(e.target.value), max - 1))}
          />
        </div>
        <div className="input-group">
          <label>Max (Lakh)</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Math.max(Number(e.target.value), min + 1))}
          />
        </div>
      </div>

      <div className="range-slider-wrapper">
        <input
          type="range"
          min={0}
          max={UI_MAX}
          value={min}
          className="range-input"
          style={{ zIndex: min > UI_MAX - 10 ? '5' : '3' }}
          onChange={(e) => setMin(Math.min(Number(e.target.value), max - 1))}
        />
        <input
          type="range"
          min={0}
          max={UI_MAX}
          value={max}
          className="range-input"
          style={{ zIndex: '4' }}
          onChange={(e) => setMax(Math.max(Number(e.target.value), min + 1))}
        />

        <div className="slider-base-track"></div>
        <div
          className="slider-filled-track"
          style={{
            left: `${getPercent(min)}%`,
            width: `${getPercent(max) - getPercent(min)}%`,
          }}
        ></div>
      </div>

      <div className="budget-display-label">
        ₹ {min}L – {max === UI_MAX ? 'Max' : `${max}L`}
      </div>
    </div>
  );
}

export default BudgetFilter;
