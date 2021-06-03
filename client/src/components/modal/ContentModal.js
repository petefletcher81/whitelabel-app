import React, { useState } from "react";
import {
  deleteContent,
  deleteItem,
  updateContent,
  updateData,
} from "../../utils/apiCalls";
import "./Modal.scss";

const ContentModal = ({ data, setToggleContentModal }) => {
  const { page, type, item } = data;
  const [newContent, setNewContent] = useState(item);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onChangeContentDetails = (event) => {
    const { name, value } = event.target;
    let newValue;

    if (type === "enquiries-content") {
      newValue = !newContent.contacted;
    }

    setNewContent({ ...newContent, [name]: newValue ? newValue : value });
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
        const response = await updateContent(page, newContent, newContent.id);
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
    <div className="backdrop w-full h-full" data-testid="backdrop">
      <div className="modal">
        <h1>Site Content</h1>
        {newContent && type === "site-content" && (
          <div className="modal__site-content" data-testid="edit-content-modal">
            <div className="modal__site-content-id">
              <label htmlFor="content-id" className="visuallyhidden" />
              <input
                id="newContent"
                type="text"
                name="content-id"
                value={newContent.id}
                placeholder={newContent.id}
                disabled
              />
            </div>
            <div className="modal__site-content-heading">
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
            </div>
            <div className="modal__site-content-content">
              <input
                id="newContent"
                aria-label="content"
                type="text"
                name="content"
                value={newContent.content}
                placeholder={newContent.content}
                onChange={onChangeContentDetails}
              />
            </div>
            <div className="modal__site-content-created-at">
              <input
                id="newContent"
                aria-label="content createdAt"
                type="text"
                name="createdAt"
                value={newContent.createdAt}
                placeholder={newContent.createdAt}
                disabled
              />
            </div>
          </div>
        )}

        {newContent && type === "image-content" && (
          <div
            className="modal__site-content"
            data-testid="image-content-wrapper"
          >
            <div className="modal__site-content-id">{newContent.id}</div>
            <div className="modal__site-content-section">
              {newContent.section}
            </div>
            {newContent.image && (
              <>
                <div className="modal__site-content-content">
                  {newContent.image}
                </div>
                <img src={newContent.image} alt="chosen image" />
              </>
            )}
            {newContent.banner && (
              <>
                <div className="modal__site-content-content">
                  {newContent.banner}
                </div>
                <img src={newContent.banner} alt="chosen banner" />
              </>
            )}
            <div className="modal__site-content-created-at">
              {newContent.createdAt}
            </div>
          </div>
        )}

        {newContent && type === "enquiries-content" && (
          <div className="modal__site-content" data-testid="enquiry-content">
            <div className="modal__site-content-email">{newContent.email}</div>
            <div className="modal__site-content-name">{newContent.name}</div>
            <div className="modal__site-content-created-at">
              <input
                id="newContent"
                aria-label="content createdAt"
                type="text"
                name="createdAt"
                value={newContent.createdAt}
                placeholder={newContent.createdAt}
                disabled
              />
            </div>
            <div className="modal__site-content">
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
            </div>
          </div>
        )}

        {newContent &&
          type === "footer-content" &&
          newContent.key === "company" && (
            <div
              className="modal__site-content"
              data-testid="footer-content-company"
            >
              <div className="modal__site-content-company-name">
                <input
                  id="newContent-name"
                  aria-label="content company name"
                  type="text"
                  name="companyName"
                  value={newContent.companyName}
                  onChange={onChangeContentDetails}
                  placeholder={newContent.companyName}
                />
              </div>
              <div className="modal__site-content-company-address">
                <input
                  id="newContent-address"
                  aria-label="content company address"
                  type="text"
                  name="companyAddress"
                  value={newContent.companyAddress}
                  onChange={onChangeContentDetails}
                  placeholder={newContent.companyAddress}
                />
              </div>
              <div className="modal__site-content-company-number">
                <input
                  id="newContent-number"
                  aria-label="content company number"
                  type="text"
                  name="companyName"
                  value={newContent.companyNumber}
                  onChange={onChangeContentDetails}
                  placeholder={newContent.companyNumber}
                />
              </div>
              <div className="modal__site-content-company-mobile">
                <input
                  id="newContent-mobile"
                  aria-label="content company mobile"
                  type="text"
                  name="mobileNumber"
                  value={newContent.mobileNumber}
                  onChange={onChangeContentDetails}
                  placeholder={newContent.mobilrNumber}
                />
              </div>
            </div>
          )}

        {newContent &&
          type === "footer-content" &&
          newContent.key === "social" && (
            <div
              className="modal__site-content"
              data-testid="footer-content-social"
            >
              <div className="modal__site-content-facebook">
                <input
                  id="newContent"
                  aria-label="social data facebook"
                  type="text"
                  name="socialFacebook"
                  value={newContent.socialFacebook}
                  placeholder={newContent.socialFacebook}
                  onChange={onChangeContentDetails}
                />
              </div>
              <div className="modal__site-content-instagram">
                <input
                  id="newContent-insta"
                  aria-label="social data instagram"
                  type="text"
                  name="socialInstagram"
                  value={newContent.socialInstagram}
                  placeholder={newContent.socialInstagram}
                  onChange={onChangeContentDetails}
                />
              </div>
              <div className="modal__site-content-pinterest">
                <input
                  id="newContent-pinterest"
                  aria-label="social data pinterest"
                  type="text"
                  name="socialPinterest"
                  value={newContent.socialPinterest}
                  placeholder={newContent.socialPinterest}
                  onChange={onChangeContentDetails}
                />
              </div>
              <div className="modal__site-content-linkedin">
                <input
                  id="newContent-linkedin"
                  aria-label="social data linkedin"
                  type="text"
                  name="socialLinkedin"
                  value={newContent.socialLinkedin}
                  placeholder={newContent.socialLinkedin}
                  onChange={onChangeContentDetails}
                />
              </div>
              <div className="modal__site-content-twitter">
                <input
                  id="newContent-twitter"
                  aria-label="social data twitter"
                  type="text"
                  name="socialTwitter"
                  value={newContent.socialTwitter}
                  placeholder={newContent.socialTwitter}
                  onChange={onChangeContentDetails}
                />
              </div>
            </div>
          )}
        {/* TODO do i need a disabled conditional here for images*/}
        <button onClick={handleSave}>Save</button>
        <button
          onClick={(e) => {
            setToggleContentModal(null);
          }}
        >
          Close
        </button>
        <button
          onClick={type === "site-content" ? handleDeleteContent : handleDelete}
        >
          Delete
        </button>
        {success && <div className="">{success}</div>}
        {error && <div className="">{error}</div>}
      </div>
    </div>
  );
};

export default ContentModal;
