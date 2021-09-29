import React from "react";

const DashboardContentCard = ({
  section,
  index,
  datatestid,
  setToggleContentModal,
  setSelectedImage,
  mobile,
  images,
}) => {
  const hasChangeableImage = section.page === "home";
  return (
    <>
      <section
        className="dashboard__content--contents grid p-1"
        key={`${section.createdAt}-${index}-dashboard`}
        data-testid={datatestid}
      >
        <div className="dashboard__content-heading text-center">
          {section.heading}
        </div>
        <div className="dashboard__content-content h-4 hidden scroll-y">
          {section.content}
        </div>
        <div className="dashboard__content-page text-center">
          {section.page}
        </div>
        {/* {!mobile && (
          <div className="dashboard__content-created-at text-center">
            {section.createdAt}
          </div>
        )} */}
        <div className="flex">
          <button
            className="btn p-1"
            onClick={() =>
              setToggleContentModal({
                page: section.page,
                item: section,
                type: "site-content",
              })
            }
          >
            Edit
          </button>
        </div>
        {hasChangeableImage ? (
          <div className="flex">
            <button
              className="btn"
              onClick={() =>
                setSelectedImage({
                  images,
                  page: "dashboard",
                  relatedContent: section,
                })
              }
            >
              Change Image
            </button>
          </div>
        ) : (
          <div className="spacer-100"></div>
        )}
      </section>
    </>
  );
};

export default DashboardContentCard;
