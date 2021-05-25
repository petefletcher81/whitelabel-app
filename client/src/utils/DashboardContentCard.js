import React from "react";

const DashboardContentCard = ({
  section,
  index,
  datatestid,
  setToggleContentModal,
}) => {
  return (
    <>
      <section
        className="dashboard__content"
        key={`${section.createdAt}-${index}-dashboard`}
        data-testid={datatestid}
      >
        <div className="dashboard__content-heading">{section.heading}</div>
        <div className="dashboard__content-content">{section.content}</div>
        <div className="dashboard__content-created-at">{section.createdAt}</div>
        <button
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
      </section>
    </>
  );
};

export default DashboardContentCard;
