import React, { useEffect, useState } from "react";
import {
  getAllContent,
  getAllImages,
  getEnquiries,
} from "../../utils/apiCalls";

const Dashboard = () => {
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
      <div className="dashboard__enquiries-wrapper">
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
              </section>
            );
          })}
      </div>
      <div className="dashboard__content-wrapper">
        {content &&
          content.map((section, index) => {
            return (
              <section
                className="dashboard__content"
                key={`${section.createdAt}-${index}-dashboard`}
              >
                <div className="dashboard__content-heading">
                  {section.heading}
                </div>
                <div className="dashboard__content-content">
                  {section.content}
                </div>
                <div className="dashboard__content-created-at">
                  {section.createdAt}
                </div>
              </section>
            );
          })}
      </div>
      <div className="dashboard__images-wrapper">
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
              </section>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
