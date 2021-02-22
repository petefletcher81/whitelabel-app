import React, { useEffect, useState } from "react";
import { getFooterContent } from "../../utils/apiCalls";
import ContentError from "../../utils/contentError";

const Footer = () => {
  const [footerContent, setFooterContent] = useState(null);
  const [error, setError] = useState(null);

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
    <div className="footer-content">
      {error && !footerContent && <ContentError error={error} />}
      {footerContent &&
        footerContent.map((content) => {
          return (
            <div className="footer-content__wrapper" key={content.id}>
              <div
                className={`footer-content__${content.id}`}
                data-testid={`footer-${content.id}`}
              >
                {content?.id === "company"
                  ? generateFooterCompany(content)
                  : generateFooterSocial(content)}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Footer;
