import React, { useEffect, useState } from "react";
import {
  getAllContent,
  getAllImages,
  getEnquiries,
} from "../../utils/apiCalls";
import DashboardContentCard from "../../utils/DashboardContentCard";

const Dashboard = ({ setToggleContentModal }) => {
  const [enquiries, setEnquiries] = useState(null);
  const [content, setContent] = useState(null);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllEquiries = async () => {
      try {
        const response = await getEnquiries();
        setEnquiries(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getAllEquiries();
  }, []);

  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await getAllContent();
        setContent(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getContent();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await getAllImages();
        setImages(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getImages();
  }, []);

  return (
    <div className="dashboard" data-testid="dashboard-screen">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
      </div>
      <div
        className="dashboard__enquiries-wrapper"
        data-testid="manage-enquiries"
      >
        <h2>Manage Enquiries</h2>
        {enquiries &&
          !error &&
          enquiries.map((enquiry) => {
            return (
              <section
                className="dashboard__enquiries--enquiry"
                key={enquiry.name}
              >
                <div className="dashboard__enquiries--enquiry-name">
                  {enquiry.name}
                </div>
                <div className="dashboard__enquiries--enquiry-email">
                  {enquiry.email}
                </div>
                <div className="dashboard__enquiries--enquiry-created-at">
                  {enquiry.createdAt}
                </div>
                <button
                  onClick={() =>
                    setToggleContentModal({
                      content: enquiry,
                      type: "enquiries-content",
                    })
                  }
                >
                  Edit
                </button>
              </section>
            );
          })}
      </div>
      {/* flex column or grid */}
      <div className="dashboard__content-wrapper" data-testid="manage-content">
        <h2>Manage Content</h2>
        {content &&
          content?.map((section, index) => {
            return (
              <div key={`${section.createdAt}-${index}-dashboard`}>
                <DashboardContentCard
                  page={section.page}
                  section={section}
                  index={index}
                  datatestid={"home-content-dashboard"}
                  setToggleContentModal={setToggleContentModal}
                />
              </div>
            );
          })}
      </div>
      <div className="dashboard__images-wrapper" data-testid="manage-images">
        <h2>Manage Images</h2>
        {images &&
          images.map((image) => {
            return (
              <section className="dashboard__images" key={image.id}>
                <div className="dashboard__image-id">{image.id}</div>
                {image.image && (
                  <div className="dashboard__image-image">{image.image}</div>
                )}
                {image.banner && (
                  <div className="dashboard__image-banner">{image.banner}</div>
                )}
                <div className="dashboard__image-section">{image.section}</div>
                <div className="dashboard__content-created-at">
                  {image.createdAt}
                </div>
                <button
                  onClick={() =>
                    setToggleContentModal({
                      content: image,
                      type: "image-content",
                    })
                  }
                >
                  Edit
                </button>
              </section>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
