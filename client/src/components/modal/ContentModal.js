import React, { useState } from "react";
import { deleteContent, updateContent } from "../../utils/apiCalls";
import "./Modal.scss";

const ContentModal = ({ data, setToggleContentModal }) => {
  const { page, type, item } = data;
  const [newContent, setNewContent] = useState(item);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onChangeContentDetails = (event) => {
    const { name, value } = event.target;
    setNewContent({ ...newContent, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await updateContent(page, newContent, newContent.id);
      setSuccess(response.message);
    } catch (error) {
      const err = error.response?.data;
      setError(err.error);
    }
  };

  const handleDelete = () => {
    console.log("delete image enq or footer content");
  };

  const handleDeleteContent = async () => {
    try {
      const response = await deleteContent(page, newContent.id);
      setSuccess(response.message);
    } catch (error) {
      const err = error.response?.data;
      setError(err.error);
    }
  };

  return (
    <div className="backdrop w-full h-full" data-testid="backdrop">
      <div className="modal">
        {newContent && type === "site-content" && (
          <div className="modal__site-content" data-testid="edit-content-modal">
            <h1>Site Content</h1>
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
              {newContent.content}
            </div>
            <div className="modal__site-content-created-at">
              {newContent.createdAt}
            </div>
          </div>
        )}
        {newContent && type === "image-content" && (
          <div className="modal__site-content">
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
          <div className="modal__site-content">
            <div className="modal__site-content-email">{newContent.email}</div>
            <div className="modal__site-content-name">{newContent.name}</div>
            <div className="modal__site-content-created-at">
              {newContent.createdAt}
            </div>
          </div>
        )}
        {newContent && type === "footer-content" && (
          <div className="modal__site-content">
            <div className="modal__site-content-id">{newContent.id}</div>
            <div className="modal__site-content-company-name">
              {newContent.companyName}
            </div>
          </div>
        )}
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
