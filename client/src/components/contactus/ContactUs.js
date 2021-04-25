import React, { useState, useEffect } from "react";
import { getContent, addEnquiry, getBanners } from "../../utils/apiCalls";
import ContentCard from "../../utils/ContentCard";
import ContentError from "../../utils/contentError";
import { useSelector, useDispatch } from "react-redux";
import {
  setContactusContent,
  setContactusContentError,
  setContactusImageError,
  setContactusImages,
} from "../../redux/content/contactus-content/contactus-content-actions";
import "./ContactUs.scss";

const ContactUs = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.contactusContent.content);
  const banner = useSelector((state) => state.contactusContent.banners);
  const contentError = useSelector((state) => state.contactusContent.error);
  const imageError = useSelector((state) => state.contactusContent.imageError);

  const [enquiry, setEnquiry] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState(null);
  const [enquiryError, setEnquiryError] = useState(null);

  useEffect(() => {
    const getContactContent = async () => {
      try {
        const response = await getContent("contactus");
        dispatch(setContactusContent(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setContactusContentError(data));
      }
    };
    getContactContent();
  }, []);

  useEffect(() => {
    const getImageContent = async () => {
      try {
        const response = await getBanners("contactus");
        dispatch(setContactusImages(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setContactusImageError(data));
      }
    };
    getImageContent();
  }, []);

  const onChangeFormDetails = (event) => {
    const { name, value } = event.target;
    setEnquiry({ ...enquiry, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const enquiryRes = await addEnquiry(enquiry);
      setSuccess(enquiryRes);
    } catch (error) {
      const data = error.response?.data;
      setEnquiryError(data);
    }
  };

  return (
    <section className="aboutus">
      <div className="aboutus__showcase relative p-2 grid">
        <div className="aboutus__showcase-text-wrapper">
          <div className="aboutus__showcase-text">
            <h1>vestibulum morbi blandit cursus</h1>
          </div>
          <p className="py-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="aboutus-showcase-form-wrapper flex w-full">
          <div
            className="aboutus__showcase-form form relative"
            data-testid="contact-form"
          >
            <h2>Contact Us</h2>
            <form>
              <div className="aboutus__showcase-form--controls form-control">
                <label htmlFor="name" className="visuallyhidden" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={onChangeFormDetails}
                  required
                />
              </div>
              <div className="aboutus__showcase-form--controls form-control">
                <label htmlFor="email" className="visuallyhidden" />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={onChangeFormDetails}
                  required
                />
              </div>
              <label htmlFor="submit" className="visuallyhidden" />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
      {contentError && !content && <ContentError error={contentError} />}
      {content && !contentError && <ContentCard content={content[0]} />}
      <div className="aboutus__banner flex">
        {imageError && !banner && <ContentError error={imageError} />}
        {banner &&
          banner.map((b) => {
            return (
              <div
                className="aboutus__banner-image-wrapper w-full h-full relative hidden"
                key={b.id}
                data-testid="contactus-banner"
              >
                <img
                  src={b.banner}
                  alt="contact us banner"
                  className="w-full h-full"
                />
              </div>
            );
          })}
      </div>
      {content && !contentError && <ContentCard content={content[1]} />}
      <div className="aboutus__popup">
        {success && (
          <div
            className="aboutus__popup-success"
            data-testid="confirmation-modal"
          >
            {success.message}
          </div>
        )}
        {enquiryError && (
          <div
            className="aboutus__popup-enquiryError"
            data-testid="error-modal"
          >
            {enquiryError.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
