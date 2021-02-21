import React, { useEffect, useState } from "react";
import { getContent, getImages, getFooterContent } from "../utils/apiCalls";
import "./style/App.scss";

import Navbar from "./navbar/navbar";
import ContentError from "../utils/contentError";

const App = () => {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState(null);
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
    const getImageContent = async () => {
      try {
        const response = await getImages();
        const homeImages = response.filter((homeImage) => {
          return homeImage.section === "home" && homeImage["image"];
        });
        setImages(homeImages);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getImageContent();
  }, []);

  useEffect(() => {
    const getAllFooterContent = async () => {
      try {
        const response = await getFooterContent("home");
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
    companyAddress,
    contactNumber,
    mobileNumber,
  }) => {
    return (
      <>
        {companyName && (
          <div>
            Company Name :<div>{companyName}</div>
          </div>
        )}
        {companyAddress && (
          <div>
            Company Address :<div>{companyAddress}</div>
          </div>
        )}
        {contactNumber && (
          <div>
            Contact Number :<div>{contactNumber}</div>
          </div>
        )}
        {mobileNumber && (
          <div>
            Mobile Number :<div>{mobileNumber}</div>
          </div>
        )}
      </>
    );
  };

  const generateFooterSocial = ({
    socialFacebook,
    socialTwitter,
    socialInstagram,
    socialLinkedin,
    socialPinterest,
  }) => {
    return (
      <>
        {socialFacebook && (
          <div>
            Facebook :<div>{socialFacebook}</div>
          </div>
        )}
        {socialTwitter && (
          <div>
            Twitter :<div>{socialTwitter}</div>
          </div>
        )}
        {socialInstagram && (
          <div>
            Instagram :<div>{socialInstagram}</div>
          </div>
        )}
        {socialLinkedin && (
          <div>
            LinkedIn :<div>{socialLinkedin}</div>
          </div>
        )}
        {socialPinterest && (
          <div>
            Pinterest :<div>{socialPinterest}</div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="App">
      <Navbar />
      {error && !content && <ContentError error={error} />}
      {content &&
        !error &&
        content.map((section, index) => {
          return (
            <div className="content" key={section.id[index]}>
              <div className="content__section-heading">
                {section["heading"]}
              </div>
              <div className="content__section-content">
                {section["content"]}
              </div>
              {images && (
                <div className="content__section-image-wrapper">
                  <img src={images[index].image} />
                </div>
              )}
            </div>
          );
        })}
      <div className="footer-content">
        {footerContent &&
          footerContent.map((content) => {
            return (
              <div className="footer-content__wrapper" key={content.id}>
                <div
                  className="footer-content__company"
                  data-testid="footer-company"
                >
                  {content?.id === "company" && generateFooterCompany(content)}
                </div>
                <div
                  className="footer-content__social"
                  data-testid="footer-social"
                >
                  {content?.id === "social" && generateFooterSocial(content)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
