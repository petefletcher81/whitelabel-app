import React, { useState } from "react";
import ContentCard from "../components/contentCard/ContentCard";
import ContentError from "../utils/contentError";
import { addEnquiry, getContent, getImages } from "./api/apiCalls";

const ContactUs = ({ content, images }) => {
  const [enquiry, setEnquiry] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState(null);
  const [enquiryError, setEnquiryError] = useState(null);

  const contentError =
    !content || !images
      ? { message: "Missing content / Failed to load" }
      : null;

  const banner = images?.banner;
  images = null;

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
      <div className="relative p-2 grid bg-primary">
        <div className="">
          <div className="text-white">
            <h1>vestibulum morbi blandit cursus</h1>
          </div>
          <p className="py-1 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex w-full">
          <div className=" form relative" data-testid="contact-form">
            <h2>Contact Us</h2>
            <form>
              <div className="form-control">
                <label htmlFor="name" className="visuallyhidden" />
                <input
                  aria-label="enquirers name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={onChangeFormDetails}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="visuallyhidden" />
                <input
                  type="text"
                  aria-label="enquirers email"
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
              <div className="aboutus__popup pt-1">
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
            </form>
          </div>
        </div>
      </div>
      {contentError && !content && <ContentError error={contentError} />}
      {content && !contentError && returnContentForPosition("1")}
      <div className="contactus flex">
        {contentError && !banner && <ContentError error={contentError} />}
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
    </section>
  );
};

export async function getStaticProps(context) {
  const [content, images] = await Promise.all([
    getContent("contactus"),
    getImages("contactus"),
  ]);

  return {
    props: { content, images }, // will be passed to the page component as props
  };
}

export default ContactUs;
