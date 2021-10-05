import React, { useEffect, useRef, useState } from "react";
import { capitalize } from "../../utils/helpers";
import "./Dropdown.scss";

const Dropdown = ({ options, selected, onSelectedChange, label, mobile }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let isActive = true;

    document.body.addEventListener(
      "click",
      (event) => {
        if (isActive) {
          if (ref?.current?.contains(event.target)) {
            return;
          }
          setOpen(false);
        }
      },
      { capture: true }
    );

    return () => {
      isActive = false;
    };
  }, []);

  const renderedOptions = options.map((option) => {
    if (option.value === selected.value) {
      return null;
    }

    return (
      <div
        className="dropdown__item"
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
    <div className="dropdown m-1 border-primary h-full" ref={ref}>
      <div className="dropdown__field h-full border-primary">
        <label className="dropdown__label text-center text-primary mx-1 border-bottom-sm">
          {mobile ? `${capitalize(label)}` : `Select a ${label}`}
        </label>
        <div
          className={`dropdown__selection h-75 flex m-2 px-1`}
          aria-label="dropdown "
          onClick={() => {
            const newValue = !open;
            setOpen(newValue);
          }}
          aria-expanded={open}
          role="combobox"
        >
          <div className="text-primary">{selected.label}</div>
          <i
            role="img"
            aria-label="down arrow icon"
            className="fas fa-arrow-down text-primary mx-1"
          ></i>
          {open && (
            <ul
              aria-expanded={open}
              role="listbox"
              className={`dropdown__menu border-primary 
              text-primary flex flex-col`}
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
