import React from "react";
import BannerSkeleton from "../banner/BannerSkeleton";
import CardSkeleton from "../card/CardSkeleton";
import ContentCardSkeleton from "../contentCard/ContentCardSkeleton";

const ApiSkeleton = ({ type, options }) => {
  const renderLoadingSkeleton = (type) => {
    const skeletonType = {
      ContentCard: <ContentCardSkeleton {...options} />,
      Card: <CardSkeleton {...options} />,
      Banner: <BannerSkeleton {...options} />,
    };

    return skeletonType[type];
  };

  const isMobile = window.innerWidth < 990;

  return (
    <div
      data-testid="skeleton-wrapper"
      className={`skeleton-wrapper ${isMobile ? "" : "m-1"} w-full`}
    >
      {renderLoadingSkeleton(type)}
    </div>
  );
};

export default ApiSkeleton;
