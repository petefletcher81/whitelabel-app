import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener(
      "click",
      (event) => {
        if (ref?.current?.contains(event.target)) {
          return;
        }
        setOpen(false);
      },
      { capture: true }
    );
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        className="item"
        key={option.value}
        onClick={() => {
          onSelectedChange(option);
        }}
        role="option"
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="dropdown" ref={ref}>
      <div className="dropdown__field">
        <label className="dropdown__label">{`Select a ${label}`}</label>
        <div
          className={`dropdown__selection`}
          aria-label="dropdown"
          onClick={() => {
            const newValue = !open;
            setOpen(newValue);
          }}
          aria-expanded={open}
          role="combobox"
        >
          <i className="dropdown__icon icon">0</i>
          <div className="text-primary">{selected.label}</div>
          {open && (
            <ul
              aria-expanded={open}
              role="listbox"
              className={`dropdown__menu`}
            >
              {renderedOptions}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
