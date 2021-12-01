import React from "react";
import "../App.scss";

const Card = ({
  iconType,
  heading,
  paragraph,
  cta,
  ctaLabel,
  customStyles = { container: "", width: "", height: "" },
  ariaLabel,
}) => {
  const { container, width, height } = customStyles;
  return (
    <div
      className={`card flex flex-col 
      text-primary p-2 bg-secondary 
      ${container} ${width ? width : "w-300"} ${height ? height : "h-300"}`}
    >
      <div className="text-primary my-1">
        <i className={iconType} />
      </div>
      {heading && <h4>{heading}</h4>}
      {paragraph && <p>{paragraph}</p>}
      {cta && (
        <button
          className="btn btn-primary"
          aria-label={ariaLabel}
          onClick={() => cta()}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
};

export default Card;
