import React from "react";

const CardSkeleton = ({ amount, isTestimonials }) => {
  const isMobile = window.innerWidth < 990;

  let cardArray = [];
  const createArray = (size) => {
    Array.from({ length: size }, (v, i) => {
      cardArray.push(
        <div
          className={`flex flex-col text-primary p-2 bg-secondary ${
            isTestimonials ? "" : "w-full"
          }`}
        >
          <div className="flex flex-col w-300 h-300 bg-white">
            <div className="h-3 bg-skeleton w-80 hidden mb-1">
              <div className="h-3 w-full bg-skeleton skeleton"></div>
            </div>
            <div className="h-3 bg-skeleton w-80 hidden mb-1">
              <div className="h-3 w-full bg-skeleton skeleton"></div>
            </div>
            <div className="h-3 bg-skeleton w-50 hidden mb-1">
              <div className="h-3 w-full bg-skeleton skeleton"></div>
            </div>
          </div>
        </div>
      );
    });
  };

  createArray(amount);

  return (
    <div
      className={`flex hidden ${
        isTestimonials ? "justify-start" : "justify-center"
      }`}
    >
      {cardArray.map((card, index) => {
        return <React.Fragment key={`card-${index}`}>{card}</React.Fragment>;
      })}
    </div>
  );
};

export default CardSkeleton;
