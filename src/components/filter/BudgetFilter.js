import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './BudgetFilter.css';
import { UI_MAX } from '../../utils/constants';

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

  // The function that actually updates the URL
  const updateUrl = (newMin, newMax) => {
    const params = new URLSearchParams(searchParams);
    
    if (newMin === 0 && newMax === UI_MAX) {
      params.delete('budget');
    } else {
      const budgetString = `${newMin}-${newMax === UI_MAX ? '' : newMax}`;
      params.set('budget', budgetString);
    }
    
    setSearchParams(params, { replace: true });
  };

  const handleMinChange = (v) => setMin(Math.min(v, max - 1));
  const handleMaxChange = (v) => setMax(Math.max(v, min + 1));
  const getPercent = (value) => Math.round((value / UI_MAX) * 100);

  return (
    <div className="budget-filter-container">
      <div className="budget-input-row">
        <div className="input-group">
          <label>Min (Lakh)</label>
          <input
            type="number"
            value={min}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            onBlur={() => updateUrl(min, max)} // Update URL when user clicks away
          />
        </div>
        <div className="input-group">
          <label>Max (Lakh)</label>
          <input
            type="number"
            value={max}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            onBlur={() => updateUrl(min, max)} // Update URL when user clicks away
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
          onChange={(e) => handleMinChange(Number(e.target.value))}
          onMouseUp={() => updateUrl(min, max)} // Update URL when user releases slider
          onTouchEnd={() => updateUrl(min, max)} // For mobile support
        />
        <input
          type="range"
          min={0}
          max={UI_MAX}
          value={max}
          className="range-input"
          style={{ zIndex: '4' }}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          onMouseUp={() => updateUrl(min, max)} // Update URL when user releases slider
          onTouchEnd={() => updateUrl(min, max)} // For mobile support
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