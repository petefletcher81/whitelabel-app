import React from "react";

const Row = ({ classname, shaded, children, textWhite }) => {
  return (
    <div
      className={`${classname}  py-1 ${shaded ? "shaded" : null} ${
        textWhite ? "text-white" : "text-primary"
      }`}
    >
      {children}
    </div>
  );
};

export default Row;
