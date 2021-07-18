import React, { useState } from "react";
import { postImages } from "../../utils/apiCalls";
import ContentError from "../../utils/contentError";

const DashboardImages = ({
  images,
  mobile,
  imageError,
  setToggleContentModal,
}) => {
  const [imagesUpload, setImagesUpload] = useState(null);

  const handleImageOnChange = (event) => {
    const { files } = event.target;
    console.log("been clicked", files);
    setImagesUpload(files[0]);
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("image-input");
    fileInput.click();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imagesUpload, imagesUpload.name);

    console.log(formData);

    try {
      let response = await postImages(formData);
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div
        className="dashboard__images-wrapper border-wrapper border-bottom-sm
      mb-2 w-full hidden"
        data-testid="manage-images"
      >
        {/* headings images */}
        <div className="dashboard__heading py-1 flex text-white bg-primary">
          Manage Images
        </div>
        <div
          className="dashboard__images--headings 
      grid border-bottom-sm p-1 text-center hidden "
        >
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
          <div className="form-wrapper w-full p-2 flex h-0 justify-between">
            <h4 className="text-primary">Want to add an image?</h4>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="Upload Images" className="visuallyhidden" />
              <input
                type="file"
                id="image-input"
                aria-label="image upload"
                onChange={handleImageOnChange}
                hidden
              />
              <div className="flex justify-around">
                <button
                  className="btn btn-primary mx-2"
                  onClick={handleImageUpload}
                  aria-label="handle upload image"
                  id="handle-image-upload"
                >
                  Upload Image
                </button>
                <button
                  className="btn btn-tertiary mx-2"
                  onClick={handleSubmit}
                  aria-label="save new image"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          {images &&
            !imageError &&
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
                        <div className="dashboard__image-name">{image.key}</div>
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
          {imageError && (
            <div className="dashboard__enquires-error h-full text-error flex bg-white">
              <ContentError error={imageError} />
            </div>
          )}
        </div>
        )
      </div>
    </>
  );
};

export default DashboardImages;
