import React from "react";

const AccordionItem = ({ option, hasShadow }) => {
  return (
    <div
      className={`text-primary w-80 p-1 border-primary-xb bg-white ${
        hasShadow && "shadow-soft"
      }`}
    >
      {option.value}
    </div>
  );
};

export default AccordionItem;
