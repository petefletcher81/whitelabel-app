import React, { useState, useEffect } from "react";
import { getContent, addEnquiry } from "../../utils/apiCalls";
import ContentCard from "../../utils/ContentCard";
import ContentError from "../../utils/contentError";

const ContactUs = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState(null);
  const [enquiryError, setEnquiryError] = useState(null);

  useEffect(() => {
    const getContactContent = async () => {
      try {
        const response = await getContent("contactus");
        setContent(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getContactContent();
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
  console.log(success, "!!!!!!!!!");
  return (
    <section className="aboutus relative">
      <div className="aboutus__showcase">
        <div className="aboutus__showcase-text">
          <h1>vestibulum morbi blandit cursus risus at ultrices mi</h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="aboutus__showcase-form card" data-testid="contact-form">
        <h2>Contact Us</h2>
        <form>
          <div className="aboutus__showcase form-control">
            <label htmlFor="name" className="visuallyhidden" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={onChangeFormDetails}
              required
            />
          </div>
          <div className="aboutus__showcase form-control">
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
      {error && !content && <ContentError error={error} />}
      {content && !error && <ContentCard content={content[0]} />}
      {content && !error && <ContentCard content={content[1]} />}
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
