import React, { useEffect, useState } from "react";
import { getFooterContent } from "../../utils/apiCalls";
import ContentError from "../../utils/contentError";
import classnames from "classnames";
import "./Footer.scss";
import { waitForElementToBeRemoved } from "@testing-library/dom";

const Footer = () => {
  const [footerContent, setFooterContent] = useState(null);
  const [error, setError] = useState(null);
  const mobile = window.innerWidth < 990;

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
    // need to clean up so no memory leak in tests
    return () => {};
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
          <div className="company-details border-bottom my-1 flex">
            <strong>{companyName}</strong>
          </div>
        )}
        {companyAddress && (
          <div
            className={classnames(
              "company-details border-bottom m-1 flex text-center",
              {
                "flex-col ": mobile,
              }
            )}
          >
            <i
              className={classnames("fas fa-2x fa-home ", {
                "pb-1": mobile,
              })}
            ></i>
            <div className="px-1">{companyAddress}</div>
          </div>
        )}
        {contactNumber && (
          <div
            className={classnames("company-details border-bottom m-1 flex", {
              "flex-col": mobile,
            })}
          >
            <div>
              <i
                className={classnames("fas fa-2x fa-phone ", {
                  "pb-1": mobile,
                })}
              ></i>
            </div>
            <div className="px-1">{contactNumber}</div>
          </div>
        )}
        {mobileNumber && (
          <div
            className={classnames("company-details border-bottom m-1 flex", {
              "flex-col": mobile,
            })}
          >
            <div>
              <i
                className={classnames("fas fa-2x fa-mobile ", {
                  "pb-1": mobile,
                })}
              ></i>
            </div>
            <div className="px-1">{mobileNumber}</div>
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
      <section aria-label="Social Icons" className="flex mb-2">
        {socialFacebook && (
          <div>
            <a href={socialFacebook}>
              <i className=" social-icons fab fa-2x fa-facebook px-1"></i>
            </a>
          </div>
        )}
        {socialTwitter && (
          <div>
            <a href={socialTwitter}>
              <i className="social-icons fab fa-2x fa-twitter px-1"></i>
            </a>
          </div>
        )}
        {socialInstagram && (
          <div>
            <a href={socialInstagram}>
              <i className="social-icons fab fa-2x fa-instagram px-1"></i>
            </a>
          </div>
        )}
        {socialLinkedin && (
          <div>
            <a href={socialLinkedin}>
              <i className="social-icons fab fa-2x fa-linkedin px-1"></i>
            </a>
          </div>
        )}
        {socialPinterest && (
          <div>
            <a href={socialPinterest}>
              <i className="social-icons fab fa-2x fa-pinterest px-1"></i>
            </a>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="footer" data-testid="footer-section">
      <div
        className={classnames("justify-between", {
          "flex flex-col": mobile,
          flex: !mobile,
        })}
      >
        {!footerContent && !error && <div className="loading">Loading ...</div>}
        {error && !footerContent && <ContentError error={error} />}
        {footerContent &&
          footerContent.map((content) => {
            return (
              <div
                className="footer-content__wrapper mx-1 w-full"
                key={content.id}
              >
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
    </div>
  );
};

export default Footer;
