import React, { useEffect, useState } from "react";
import { getContent, getFooterContent } from "../utils/apiCalls";
import "./style/App.scss";
import ContentError from "./utils/contentError";

const App = () => {
  const [content, setContent] = useState(null);
  const [footerContent, setFooterContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const response = await getContent("home");
        setContent(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const getAllFooterContent = async () => {
      try {
        const response = await getFooterContent();
        setFooterContent(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getAllFooterContent();
  }, []);

  const generateFooterCompany = ({
    companyName,
    contactNumber,
    mobileNumber,
    companyAddress,
  }) => {
    return (
      <>
        <div>Contact Number: </div>
        <div>{contactNumber}</div>
        <div>Company Name: </div>
        <div>{companyName}</div>
        <div>Mobile Number: </div>
        <div>{mobileNumber}</div>
        <div>Company Address: </div>
        <div>{companyAddress}</div>
      </>
    );
  };

  const generateFooterSocials = ({
    socialFacebook,
    socialTwitter,
    socialInstagram,
    socialLinkedin,
    socialPinterest,
  }) => {
    return (
      <>
        <div>Facebook: </div>
        <div>{socialFacebook}</div>
        <div>Twitter: </div>
        <div>{socialTwitter}</div>
        <div>Instagram: </div>
        <div>{socialInstagram}</div>
        <div>LinkedIn: </div>
        <div>{socialLinkedin}</div>
        <div>Pinterest: </div>
        <div>{socialPinterest}</div>
      </>
    );
  };

  return (
    <>
      <div className="App">
        <nav aria-labelledby="page-navigation" role="navigation">
          <ul>Home</ul>
          <ul>About Us</ul>
          <ul>Contact Us</ul>
        </nav>
        {error && !content && <ContentError error={error} />}
        {content &&
          !error &&
          content.map((section, index) => {
            return (
              <div className="content" key={section.id[index]}>
                <div className="content__section-heading" data-testid="test">
                  {section["heading-one"]}
                </div>
              </div>
            );
          })}
        <div className="">This is the body</div>
        <div className="footer-content">
          {footerContent &&
            footerContent.map((content, index) => {
              return (
                <div className="footer-content__wrapper" key={content.id}>
                  <div className="footer-content__company">
                    {content["id"] === "company" &&
                      generateFooterCompany(content)}
                  </div>
                  <div className="footer-content__social">
                    {content["id"] === "social" &&
                      generateFooterSocials(content)}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default App;
