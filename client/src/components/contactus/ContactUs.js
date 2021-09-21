import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactusContent,
  setContactusContentError,
  setContactusImageError,
  setContactusImages,
} from "../../redux/content/contactus-content/contactus-content-actions";
import { addEnquiry, getBanners, getContent } from "../../utils/apiCalls";
import ContentCard from "../../utils/ContentCard";
import ContentError from "../../utils/contentError";
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

  const returnContentForPosition = (position) => {
    const findContent = content.find((c) => c.position === position);
    return <ContentCard content={findContent} />;
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
      {content && !contentError && returnContentForPosition("1")}
      <div className="contactus flex">
        {imageError && !banner && <ContentError error={imageError} />}
        {banner &&
          banner.map((b) => {
            const { banner } = b;
            return (
              <div key={b.id}>
                {banner && (
                  <div
                    className="contactus-image-wrapper w-full h-full relative hidden"
                    data-testid="contactus-banner"
                  >
                    <img
                      src={b.banner}
                      alt="contact us banner"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {content && !contentError && returnContentForPosition("2")}
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
