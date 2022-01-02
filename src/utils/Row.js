import React from "react";

const Row = ({ classname, shaded, children, textColour }) => {
  return (
    <div
      className={`${classname}  py-1 ${
        shaded ? "shaded" : null
      } text-${textColour}`}
    >
      {children}
    </div>
  );
};

export default Row;
