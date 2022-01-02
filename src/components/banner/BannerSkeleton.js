import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="h-500 w-full">
      <div className="h-500 bg-skeleton w-full hidden mb-1">
        <div className="h-500 w-full bg-skeleton skeleton"></div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
