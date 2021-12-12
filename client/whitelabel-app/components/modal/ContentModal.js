import React, { useState } from "react";
import {
  deleteContent,
  deleteItem,
  updateData,
  updatePageContent,
} from "../../pages/api/apiCalls";
import Row from "../../utils/Row";

const ContentModal = ({ data, setToggleContentModal }) => {
  const { page, type, item } = data;
  const [newContent, setNewContent] = useState(item);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const mobile = window.innerWidth < 990;

  const onChangeContentDetails = (event) => {
    const { name, value } = event.target;
    let newValue;

    if (type === "enquiries-content") {
      newValue = !newContent.contacted;
    }

    setNewContent({
      ...newContent,
      [name]: newValue !== undefined ? newValue : value,
    });
  };

  const handleSave = async () => {
    switch (type) {
      case "enquiries-content":
        newContent.page = "enquiries";
        break;
      case "footer-content":
        newContent.page = "footer";
        break;
      default:
        break;
    }

    try {
      if (type === "site-content") {
        //TODO - this needs looking at
        const response = await updatePageContent(
          page,
          newContent,
          newContent.id,
          item.position
        );
        setSuccess(response.message);
      }
      if (type !== "site-content") {
        const response = await updateData(
          newContent.page,
          newContent,
          newContent.key
        );
        setSuccess(response.message);
      }
    } catch (error) {
      const err = error.response?.data;
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    switch (type) {
      case "enquiries-content":
        newContent.id = newContent.email;
        newContent.page = "enquiries";
        break;
      case "image-content":
        newContent.id = newContent.key;
        newContent.page = "images";
        break;
      case "footer-content":
        newContent.id = newContent.key;
        newContent.page = "footer";
        break;
    }

    try {
      const response = await deleteItem(newContent.page, newContent.id);
      setSuccess(response.message);
    } catch (error) {
      const err = error.response?.data;
      setError(err.message);
    }
  };

  const handleDeleteContent = async () => {
    try {
      const response = await deleteContent(page, newContent.id);
      setSuccess(response.message);
    } catch (error) {
      const err = error.response?.data;
      setError(err.message);
    }
  };

  return (
    <div
      className={`backdrop backdrop w-full h-full flex`}
      data-testid="backdrop"
    >
      <div className="bg-white modal p-1 rounded-1 shadow-1 text-center w-80">
        <h1 className="text-primary border-primary shadow-soft">
          Edit Content
        </h1>
        {newContent && type === "site-content" && (
          <div
            className="modal__content-grid grid-2 border-rounded rounded shadow-soft"
            data-testid="edit-content-modal"
          >
            <div className="modal__site-content-headings--wrapper">
              <Row classname="modal__site-content-id " shaded={true}>
                Id
              </Row>
              <Row className="modal__site-content-heading" shaded={false}>
                Heading
              </Row>
              <Row className="modal__site-content-content" shaded={true}>
                Content
              </Row>
            </div>

            <div className="modal__site-content--wrapper">
              <Row classname="modal__site-content-id modal-input" shaded={true}>
                <label htmlFor="content-id" className="visuallyhidden" />
                <input
                  id="newContent"
                  type="text"
                  name="content-id"
                  value={newContent.id}
                  placeholder={newContent.id}
                  disabled
                />
              </Row>
              <Row
                classname="modal__site-content-heading modal-input "
                shaded={false}
              >
                <label htmlFor="content-heading" className="visuallyhidden" />
                <input
                  id="newContent"
                  aria-label="content heading"
                  type="text"
                  name="heading"
                  value={newContent.heading}
                  placeholder={newContent.heading}
                  onChange={onChangeContentDetails}
                />
              </Row>
              <Row
                classname="modal__site-content-content modal-input "
                shaded={true}
              >
                <label htmlFor="content" className="visuallyhidden" />
                <input
                  id="newContent"
                  aria-label="content"
                  type="text"
                  name="content"
                  value={newContent.content}
                  placeholder={newContent.content}
                  onChange={onChangeContentDetails}
                />
              </Row>
            </div>
          </div>
        )}

        {newContent && type === "image-content" && (
          <div
            className="modal__content-grid"
            data-testid="image-content-wrapper"
          >
            <div className="modal__site-content--wrapper ">
              {newContent.image && (
                <>
                  <Row classname="modal__site-content-image shadow-soft flex bg-primary rounded-1">
                    <img src={newContent.image} alt="chosen image" />
                  </Row>
                </>
              )}
              {newContent.banner && (
                <>
                  <Row classname="modal__site-content-image shadow-soft flex bg-primary rounded-1">
                    <img src={newContent.banner} alt="chosen banner" />
                  </Row>
                </>
              )}
              {newContent.gallery && (
                <>
                  <Row classname="modal__site-content-image shadow-soft flex bg-primary rounded-1">
                    <img src={newContent.gallery} alt="chosen gallery" />
                  </Row>
                </>
              )}
              <div className="modal_site-content text-primary m-1">{`Are you sure you want to delete this image from the ${newContent.section} page`}</div>
            </div>
          </div>
        )}

        {newContent && type === "enquiries-content" && (
          <div
            className="modal__content-grid grid-2 border-rounded rounded shadow-soft"
            data-testid="enquiry-content"
          >
            <div className="modal__enquiries--headings text-center">
              <Row classname="modal__enquires--headings" shaded={true}>
                Name
              </Row>
              {!mobile && (
                <>
                  <Row classname="modal__enquires--headings" shaded={false}>
                    Email
                  </Row>
                </>
              )}
              <Row classname="modal__enquires--headings shaded">Contacted</Row>
            </div>
            <div className="modal__enquiries-content">
              <Row classname="modal__enquires--headings" shaded={true}>
                {newContent.name}
              </Row>
              {!mobile && (
                <>
                  <Row classname="modal__enquires--headings" shaded={false}>
                    {newContent.email}
                  </Row>
                </>
              )}
              <Row classname="modal__enquires--headings shaded">
                <label htmlFor="enquiry checkbox" className="visuallyhidden" />
                <input
                  className="checkbox"
                  name="contacted"
                  type="checkbox"
                  value={newContent.contacted ? true : false}
                  role="checkbox"
                  onChange={onChangeContentDetails}
                  checked={newContent.contacted ? true : false}
                />
              </Row>
            </div>
          </div>
        )}

        {newContent &&
          type === "footer-content" &&
          newContent.key === "company" && (
            <div
              className="modal__site-content grid-2 shadow-soft border-primary"
              data-testid="footer-content-company"
            >
              <div className="modal__site-content-headings--wrapper">
                <Row classname="modal__site-content " shaded={true}>
                  Name
                </Row>
                <Row className="modal__site-content" shaded={false}>
                  Address
                </Row>
                <Row className="modal__site-content" shaded={true}>
                  Landline
                </Row>
                <Row className="modal__site-content" shaded={false}>
                  Mobile
                </Row>
              </div>

              <div className="modal__site-content--wrapper">
                <Row
                  classname="modal__site-content-company-name modal-input"
                  shaded={true}
                >
                  <label htmlFor="name" className="visuallyhidden" />
                  <input
                    id="newContent-name"
                    aria-label="content company name"
                    type="text"
                    name="companyName"
                    value={newContent.companyName}
                    onChange={onChangeContentDetails}
                    placeholder={newContent.companyName}
                  />
                </Row>
                <Row
                  classname="modal__site-content-company-address modal-input"
                  shaded={false}
                >
                  <label htmlFor="address" className="visuallyhidden" />
                  <input
                    id="newContent-address"
                    aria-label="content company address"
                    type="text"
                    name="companyAddress"
                    value={newContent.companyAddress}
                    onChange={onChangeContentDetails}
                    placeholder={newContent.companyAddress}
                  />
                </Row>
                <Row
                  classname="modal__site-content-company-number modal-input"
                  shaded={true}
                >
                  <label htmlFor="landline" className="visuallyhidden" />
                  <input
                    id="newContent-number"
                    aria-label="content company number"
                    type="text"
                    name="companyName"
                    value={newContent.companyNumber}
                    onChange={onChangeContentDetails}
                    placeholder={newContent.companyNumber}
                  />
                </Row>
                <Row
                  classname="modal__site-content-company-mobile modal-input"
                  shaded={false}
                >
                  <label htmlFor="mobile" className="visuallyhidden" />
                  <input
                    id="newContent-mobile"
                    aria-label="content company mobile"
                    type="text"
                    name="mobileNumber"
                    value={newContent.mobileNumber}
                    onChange={onChangeContentDetails}
                    placeholder={newContent.mobileNumber}
                  />
                </Row>
              </div>
            </div>
          )}

        {newContent &&
          type === "footer-content" &&
          newContent.key === "social" && (
            <div
              className="modal__site-content grid-2 shadow-soft border-primary"
              data-testid="footer-content-social"
            >
              <div className="modal__site-content-headings--wrapper">
                <Row className="modal__site-content" shaded={false}>
                  Facebook
                </Row>
                <Row className="modal__site-content" shaded={true}>
                  Instagram
                </Row>
                <Row className="modal__site-content" shaded={false}>
                  Pinterest
                </Row>
                <Row className="modal__site-content" shaded={true}>
                  LinkedIn
                </Row>
                <Row classname="modal__site-content " shaded={false}>
                  Twitter
                </Row>
              </div>

              <div className="modal__site-content--wrapper ">
                <Row
                  classname="modal__site-content-facebook modal-input "
                  shaded={false}
                >
                  <label htmlFor="facebook social" className="visuallyhidden" />
                  <input
                    id="newContent"
                    aria-label="social data facebook"
                    type="text"
                    name="socialFacebook"
                    value={newContent.socialFacebook}
                    placeholder={newContent.socialFacebook}
                    onChange={onChangeContentDetails}
                  />
                </Row>
                <Row
                  classname="modal__site-content-instagram modal-input"
                  shaded={true}
                >
                  <label
                    htmlFor="instagram social"
                    className="visuallyhidden"
                  />
                  <input
                    id="newContent-insta"
                    aria-label="social data instagram"
                    type="text"
                    name="socialInstagram"
                    value={newContent.socialInstagram}
                    placeholder={newContent.socialInstagram}
                    onChange={onChangeContentDetails}
                  />
                </Row>
                <Row
                  classname="modal__site-content-pinterest modal-input"
                  shaded={false}
                >
                  <label
                    htmlFor="pinterest social"
                    className="visuallyhidden"
                  />
                  <input
                    id="newContent-pinterest"
                    aria-label="social data pinterest"
                    type="text"
                    name="socialPinterest"
                    value={newContent.socialPinterest}
                    placeholder={newContent.socialPinterest}
                    onChange={onChangeContentDetails}
                  />
                </Row>
                <Row
                  classname="modal__site-content-linkedin modal-input"
                  shaded={true}
                >
                  <label htmlFor="linkedin social" className="visuallyhidden" />
                  <input
                    id="newContent-linkedin"
                    aria-label="social data linkedin"
                    type="text"
                    name="socialLinkedin"
                    value={newContent.socialLinkedin}
                    placeholder={newContent.socialLinkedin}
                    onChange={onChangeContentDetails}
                  />
                </Row>
                <Row
                  classname="modal__site-content-twitter modal-input"
                  shaded={false}
                >
                  <label htmlFor="twitter social" className="visuallyhidden" />
                  <input
                    id="newContent-twitter"
                    aria-label="social data twitter"
                    type="text"
                    name="socialTwitter"
                    value={newContent.socialTwitter}
                    placeholder={newContent.socialTwitter}
                    onChange={onChangeContentDetails}
                  />
                </Row>
              </div>
            </div>
          )}
        <div className="modal__buttons-wrapper flex mt-1">
          {type !== "image-content" && (
            <button className="btn p-1 shadow-soft" onClick={handleSave}>
              Save
            </button>
          )}
          <button
            className="btn-tertiary p-1 shadow-soft"
            onClick={(e) => {
              setToggleContentModal(null);
            }}
          >
            Close
          </button>

          {type !== "select-image" && (
            <button
              className="btn-alert p-1 shadow-soft"
              onClick={
                type === "site-content" ? handleDeleteContent : handleDelete
              }
              disabled={success}
            >
              Delete
            </button>
          )}
        </div>
        {success && <div className="py-1 text-primary">{success}</div>}
        {error && <div className="py-1 text-error">{error}</div>}
      </div>
    </div>
  );
};

export default ContentModal;
