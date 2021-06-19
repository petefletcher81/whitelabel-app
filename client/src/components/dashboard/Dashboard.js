import React, { useEffect, useState } from "react";
import {
  getAllContent,
  getAllImages,
  getEnquiries,
  getFooterContent,
} from "../../utils/apiCalls";
import DashboardContentCard from "../../utils/DashboardContentCard";
import Row from "../../utils/Row";
import "./Dashboard.scss";

const Dashboard = ({ setToggleContentModal }) => {
  const [enquiries, setEnquiries] = useState(null);
  const [content, setContent] = useState(null);
  const [footer, setFooter] = useState(null);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState(null);
  const [social, setSocial] = useState(null);
  const mobile = window.innerWidth < 990;

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

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const response = await getFooterContent();

        const company = response.find((company) => {
          return company.id === "company";
        });
        setCompany(company);

        const social = response.find((socials) => socials.id === "social");
        console.log("======", social);
        setSocial(social);

        setFooter(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getFooterData();
  }, []);

  const splitFooterContent = () => {
    const company = footer.find((company) => {
      return company.id === "company";
    });
    setCompany(company);
    const social = footer.find((socials) => socials.id === "social");
    console.log("======", social);
    setCompany(social);
    return { company, social };
  };

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
              !error &&
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
                            console.log(enquiry);
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
            {!mobile && (
              <div className="dashboard__content--heading text-primary">
                Created At
              </div>
            )}
            <div className="dashboard__content--heading text-primary"></div>
          </div>

          <div className="dashboard__content-wrapper hidden scroll-y">
            {content &&
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
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="dashboard__image-footer-wrapper grid">
        <div
          className="dashboard__images-wrapper border-wrapper border-bottom-sm mb-2 w-full hidden"
          data-testid="manage-images"
        >
          {/* headings images */}
          <div className="dashboard__heading py-1 flex text-white bg-primary">
            Manage Images
          </div>

          <div className="dashboard__images--headings grid border-bottom-sm p-1 text-center hidden ">
            {!mobile && (
              <>
                <div className="dashboard__images--heading text-primary">
                  Name
                </div>
                <div className="dashboard__images--heading text-primary">
                  Created At
                </div>
              </>
            )}
            <div className="dashboard__images--heading text-primary">Image</div>
            <div className="dashboard__images--heading-page text-primary">
              section
            </div>
            <div className="dashboard__images--heading text-primary"></div>
          </div>

          {/* images content */}
          <div className="dashboard__images-content-wrapper hidden scroll-y">
            {images &&
              images.map((image, index) => {
                return (
                  <section
                    className={`dashboard__images--content ${
                      index % 2 === 0 ? "shaded" : null
                    }`}
                    key={image.id}
                  >
                    <div className="dashboard__images--contents grid p-1">
                      {!mobile && (
                        <>
                          <div className="dashboard__image-name">
                            {image.key}
                          </div>
                          <div className="dashboard__images-created-at">
                            {image.createdAt}
                          </div>
                        </>
                      )}
                      {image.image && (
                        <div className="dashboard__image-image">
                          <img src={image.image} className="w-full h-full" />
                        </div>
                      )}
                      {image.banner && (
                        <div className="dashboard__image-banner">
                          <img src={image.banner} className="w-full h-full" />
                        </div>
                      )}
                      {image.gallery && (
                        <div className="dashboard__image-gallery">
                          <img src={image.gallery} className="w-full h-full" />
                        </div>
                      )}
                      <div className="dashboard__image-section text-center">
                        {image.section}
                      </div>
                      <button
                        className="btn p-1"
                        onClick={() =>
                          setToggleContentModal({
                            item: image,
                            page: "images",
                            type: "image-content",
                          })
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </section>
                );
              })}
          </div>
        </div>

        <div
          className="dashboard__footer-company-wrapper border-wrapper border-bottom-sm mb-2 w-full hidden"
          data-testid="manage-footer"
        >
          {footer && (
            <div className="dashboard__footer-wrapper grid">
              <div className="dashboard__footer-company-details flex flex-col hidden scroll-x">
                <div className="dashboard__footer-headings grid bg-primary px-1">
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Company Name
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Address
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Phone
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Mobile
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    id
                  </Row>
                </div>

                <div className="dashboard__footer-content grid shaded p-1">
                  <div className="dashboard__footer--content">
                    {company?.companyName}
                  </div>
                  <div className="dashboard__footer--content">
                    {company?.companyAddress}
                  </div>
                  <div className="dashboard__footer--content ">
                    {company?.contactNumber}
                  </div>
                  <div className="dashboard__footer--content">
                    {company?.mobileNumber}
                  </div>
                  <div className="dashboard__footer--content">
                    {company?.id}
                  </div>
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

              <div className="dashboard__footer-company-details flex flex-col hidden scroll-x">
                <div className="dashboard__footer-headings-social grid bg-primary px-1">
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Twitter
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Facebook
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    LinkedIn
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Instagram
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Pinterest
                  </Row>
                  <Row classname="dashboard__footer--content" textWhite={true}>
                    Id
                  </Row>
                </div>

                <div className="dashboard__footer-content-social grid shaded p-1">
                  <div className="dashboard__footer--content">
                    {social?.socialTwitter}
                  </div>
                  <div className="dashboard__footer--content shaded">
                    {social?.socialFacebook}
                  </div>
                  <div className="dashboard__footer--content">
                    {social?.socialLinkedin}
                  </div>
                  <div className="dashboard__footer--content shaded">
                    {social?.socialInstagram}
                  </div>
                  <div className="dashboard__footer--content">
                    {social?.socialPinterest}
                  </div>
                  <div className="dashboard__footer--content shaded">
                    {social?.id}
                  </div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
