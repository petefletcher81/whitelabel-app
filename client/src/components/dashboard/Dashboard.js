import React, { useEffect, useState } from "react";
import {
  getAllContent,
  getAllImages,
  getEnquiries,
  getFooterContent,
} from "../../utils/apiCalls";
import ContentError from "../../utils/contentError";
import DashboardContentCard from "../../utils/DashboardContentCard";
import Row from "../../utils/Row";
import "./Dashboard.scss";
import DashboardImages from "./DashboardImages";

const Dashboard = ({ setToggleContentModal, setSelectedImage }) => {
  const [enquiries, setEnquiries] = useState(null);
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);
  const [images, setImages] = useState(null);
  const [contentError, setContentError] = useState(null);
  const [enquiriesError, setEnquiriesError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [footerError, setFooterError] = useState(null);
  const [company, setCompany] = useState(null);
  const [social, setSocial] = useState(null);
  const [fetchNewImages, setFetchNewImages] = useState(false);
  const mobile = window.innerWidth < 990;

  useEffect(() => {
    const getAllEquiries = async () => {
      try {
        const response = await getEnquiries();
        setEnquiries(response);
      } catch (error) {
        const data = error.response?.data;
        setEnquiriesError(data);
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
        setContentError(data);
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
        setImageError(data);
      }
    };
    getImages();
  }, [fetchNewImages]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const response = await getFooterContent();

        const company = response.find((company) => {
          return company.id === "company";
        });

        setCompany(company);

        const social = response.find((socials) => socials.id === "social");
        setSocial(social);

        setFooter(response);
      } catch (error) {
        const data = error.response?.data;
        setFooterError(data);
      }
    };
    getFooterData();
  }, []);

  const bannerImages = images?.filter((image) =>
    image.hasOwnProperty("banner")
  );

  return (
    <div
      className="dashboard border-primary flex flex-col grid p-2"
      data-testid="dashboard-screen"
    >
      <div className="dashboard__header flex">
        <h1 className="text-title-m text-primary">Dashboard</h1>
      </div>

      <div className="dashboard__enquiry-content-wrapper grid">
        {/* enquiries table */}
        <div
          className={`dashboard__enquiries-wrapper border-wrapper border-bottom-sm mb-2 w-full`}
          data-testid="manage-enquiries"
        >
          <div className="dashboard__heading py-1 flex text-white bg-primary">
            Manage Enquiries
          </div>
          {/* headings enquiries */}
          <div className="dashboard__enquiries--headings grid border-bottom-sm p-1 text-center">
            <div className="dashboard__enquiries--heading text-primary">
              Name
            </div>
            {!mobile && (
              <div className="dashboard__enquiries--heading text-primary">
                Email
              </div>
            )}
            <div className="dashboard__enquiries--heading text-primary">
              Created At
            </div>
            <div className="dashboard__enquiries--heading text-primary">
              Contacted
            </div>
            <div className="dashboard__enquiries--heading text-primary"></div>
          </div>
          <div className="dashboard__enquiry-wrapper hidden scroll-y">
            {enquiries &&
              !enquiriesError &&
              enquiries.map((enquiry, i) => {
                return (
                  <section
                    className={`dashboard__enquiries grid ${
                      i % 2 === 0 ? "shaded" : null
                    }`}
                    key={enquiry.name}
                  >
                    {/* data enquiries */}
                    <div className="dashboard__enquiries--contents grid p-1">
                      <div className="dashboard__enquiries--content text-center">
                        {enquiry.name}
                      </div>
                      {!mobile && (
                        <div className="dashboard__enquiries--content text-center">
                          {enquiry.email}
                        </div>
                      )}
                      <div className="dashboard__enquiries--content text-center">
                        {enquiry.createdAt}
                      </div>
                      <div className="dashboard__enquiries--content text-center">
                        {enquiry.contacted ? "yes" : "no"}
                      </div>
                      <div className="flex">
                        <button
                          className="btn p-1"
                          onClick={() => {
                            setToggleContentModal({
                              item: enquiry,
                              page: "enquiries",
                              type: "enquiries-content",
                            });
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </section>
                );
              })}
            {enquiriesError && (
              <div className="dashboard__enquires-error h-full text-error flex bg-white">
                <ContentError error={enquiriesError} />
              </div>
            )}
          </div>
        </div>

        <div
          className="dashboard__contents-content-wrapper border-wrapper border-bottom-sm mb-2 w-full hidden"
          data-testid="manage-content"
        >
          <div className="dashboard__heading py-1 flex text-white bg-primary">
            Manage Content
          </div>
          {/* headings content */}
          <div className="dashboard__content--headings grid border-bottom-sm p-1 text-center">
            <div className="dashboard__content--heading text-primary">
              Heading
            </div>
            <div className="dashboard__content--heading text-primary">
              Content
            </div>
            <div className="dashboard__content--heading-page text-primary">
              Page
            </div>
            {/* {!mobile && (
              <div className="dashboard__content--heading text-primary spacer-50">
                Created At
              </div>
            )} */}
            <div className="dashboard__content--heading text-primary"></div>
            <div className="dashboard__content--heading text-primary"></div>
          </div>

          <div className="dashboard__content-wrapper hidden scroll-y">
            {content &&
              !contentError &&
              content?.map((section, index) => {
                return (
                  <div
                    className={`dashboard__content grid ${
                      index % 2 === 0 ? "shaded" : null
                    }`}
                    key={`${section.createdAt}-${index}-dashboard`}
                  >
                    <DashboardContentCard
                      mobile={mobile}
                      page={section.page}
                      section={section}
                      index={index}
                      datatestid={"home-content-dashboard"}
                      setToggleContentModal={setToggleContentModal}
                      setSelectedImage={setSelectedImage}
                      images={images}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="dashboard__image-footer-wrapper grid">
        <DashboardImages
          setToggleContentModal={setToggleContentModal}
          images={images}
          mobile={mobile}
          imageError={imageError}
          setFetchNewImages={setFetchNewImages}
        />
        <div
          className="dashboard__footer-company-wrapper border-wrapper 
            border-bottom-sm mb-2 w-full hidden"
          data-testid="manage-footer"
        >
          {footer && (
            <div className="dashboard__footer-wrapper grid">
              <div
                className="dashboard__footer-company-details flex flex-col hidden scroll-x"
                data-testid="manage-footer-company"
              >
                <div className="dashboard__footer-headings grid bg-primary px-1">
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Company Name
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Address
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Phone
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Mobile
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    id
                  </Row>
                </div>

                <div className="dashboard__footer-content grid shaded p-1">
                  <Row className="dashboard__footer--content">
                    {company?.companyName}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {company?.companyAddress}
                  </Row>
                  <Row className="dashboard__footer--content ">
                    {company?.contactNumber}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {company?.mobileNumber}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {company?.id}
                  </Row>
                  <button
                    className="btn p-1"
                    onClick={() =>
                      setToggleContentModal({
                        item: company,
                        page: "footer",
                        type: "footer-content",
                      })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div
                className="dashboard__footer-company-details flex flex-col hidden scroll-x"
                data-testid="manage-footer-social"
              >
                <div className="dashboard__footer-headings-social grid bg-primary px-1">
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Twitter
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Facebook
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    LinkedIn
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Instagram
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Pinterest
                  </Row>
                  <Row
                    classname="dashboard__footer--content"
                    textColour={"white"}
                  >
                    Id
                  </Row>
                </div>

                <div className="dashboard__footer-content-social grid shaded p-1">
                  <Row classname="dashboard__footer--content">
                    {social?.socialTwitter}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {social?.socialFacebook}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {social?.socialLinkedin}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {social?.socialInstagram}
                  </Row>
                  <Row className="dashboard__footer--content">
                    {social?.socialPinterest}
                  </Row>
                  <Row className="dashboard__footer--content">{social?.id}</Row>
                  <button
                    className="btn p-1"
                    onClick={() =>
                      setToggleContentModal({
                        item: social,
                        page: "footer",
                        type: "footer-content",
                      })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
          {footerError && (
            <div className="dashboard__enquires-error h-full text-error flex bg-white">
              <ContentError error={footerError} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
