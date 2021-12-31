import React from "react";

const Banner = ({
  ariaLabel,
  heading1,
  heading2,
  cta,
  ctaLabel,
  ctaAriaLabel,
  imgSrc,
  customStyles = { container: "", image: "" },
}) => {
  const isMobile = window.innerWidth < 990;
  return (
    <section
      role="region"
      aria-label={ariaLabel}
      className={`homepage__hero-wrapper relative text-white ${customStyles.container}`}
    >
      {(heading1 || heading2) && (
        <div
          className={`homepage__hero-button-wrapper absolute 
         ${
           isMobile ? "" : "w-500"
         } center top-35 bg-primary-opacity py-2 border-rounded shadow-1`}
        >
          <div className="banner headings-wrapper">
            {heading1 && <div className="text-title-m">{heading1}</div>}
            {heading2 && <div className="text-title-m">{heading2}</div>}
          </div>
          {cta && (
            <button
              className="btn btn-tertiary"
              aria-label={
                ctaAriaLabel ? ctaAriaLabel : `${ctaLabel} call to action`
              }
              onClick={() => cta()}
            >
              {ctaLabel}
            </button>
          )}
        </div>
      )}
      <div className="opacity-low bg-primary"></div>
      {imgSrc && (
        <img className={`w-full ${customStyles.image}`} src={imgSrc} />
      )}
    </section>
  );
};

export default Banner;
