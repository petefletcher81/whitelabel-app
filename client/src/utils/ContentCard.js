import React from "react";

const ContentCard = ({ content }) => {
  return (
    <div className="content">
      <div className={`${content}-0`}>
        <div className="container grid">
          <div className="content-text-wrapper">
            <div className="content__section-heading flex m-1 heading border-bottom-primary">
              {content["heading"]}
            </div>
            <div className="content__section-content mx-1 mb-2">
              {content["content"]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
