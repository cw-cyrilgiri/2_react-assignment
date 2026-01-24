import React, { useState } from "react";
import "./FilterAccordian.css";

function FilterAccordian({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="FilterAccordion">
      <button
        type="button"
        className="FilterAccordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="FilterAccordion-title">{title}</span>
        <span className={`FilterAccordion-arrow ${isOpen ? "open" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>

      <div className={`FilterAccordion-collapse ${isOpen ? "show" : ""}`}>
        <div className="FilterAccordion-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FilterAccordian;