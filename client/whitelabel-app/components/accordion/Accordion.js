import React, { useState } from "react";
import AccordionItem from "./accordionItem/AccordionItem";

const Accordion = ({ options, hasShadow }) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleClick = (evt) => {
    if (evt.label === selected?.label) {
      setSelected(null);
      setActive(false);
      return;
    }
    const foundOption = options.find((option) => evt.label === option.label);

    const newValue = !active;
    setActive(newValue);
    setSelected(foundOption);
  };

  const renderedOptions = options.map((option) => {
    // if (option.value === selected?.value) {
    //   return null;
    // }

    const isSelected = selected?.label === option.label;

    return (
      <div className={`flex flex-col w-80`} key={option.value}>
        <div
          className={`border-primary w-80 mt-1
          ${hasShadow && !selected && "shadow-soft"}
          ${hasShadow && selected && "shadow-join"}
          `}
          aria-label={option.label}
          key={option.value}
          onClick={() => {
            handleClick(option);
          }}
          role="option"
        >
          <div className="bg-white option-wrapper p-1 text-primary flex justify-between">
            <h3>{option.label}</h3>
            {isSelected ? (
              <i className="fa fa-chevron-up text-primary" />
            ) : (
              <i className="fa fa-chevron-down text-primary" />
            )}
          </div>
        </div>
        {isSelected && (
          <AccordionItem
            active={active}
            option={option}
            hasShadow={hasShadow}
          />
        )}
      </div>
    );
  });

  return (
    <>
      <div className="accordion w-full flex flex-col">
        {options && renderedOptions}
        {/* {options &&
          options.map((option) => {
            return (
              <div className="flex flex-col">
                <div
                  className="accordion__title flex w-80 justify-between 
     text-primary border-primary p-1"
                  onClick={handleClick}
                >
                </div>
                {selected && <AccordionItem active={active} option={option} />}
              </div>
            );
          })} */}
      </div>
    </>
  );
};

export default Accordion;
