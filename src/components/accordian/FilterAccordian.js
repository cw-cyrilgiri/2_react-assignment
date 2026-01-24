import React, { useState } from "react";
import "./FilterAccordian.css";

function FilterAccordian({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="FilterAccordion">
      <button
        className="FilterAccordion-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="FilterAccordion-title">{title}</span>

        <span className={`FilterAccordion-arrow ${isOpen ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && <div className="FilterAccordion-content">{children}</div>}
    </div>
  );
}

export default FilterAccordian;
