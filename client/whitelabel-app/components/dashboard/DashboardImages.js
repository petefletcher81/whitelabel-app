import React, { useState } from "react";
import { postImages } from "../../pages/api/apiCalls";
import ContentError from "../../utils/contentError";
import Dropdown from "../dropdown/Dropdown";
import { imageOptions, pageOptions } from "./options";

const DashboardImages = ({
  images,
  imageError,
  setToggleContentModal,
  setModalInformation,
  showContentModal,
  setFetchNewImages,
}) => {
  const [imagesUpload, setImagesUpload] = useState(null);
  const [imageSelected, setImageSelected] = useState(imageOptions[0]);
  const [pageSelected, setPageSelected] = useState(pageOptions[0]);

  const handleImageOnChange = (event) => {
    const { files } = event.target;
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

    if (!imagesUpload) {
      return alert("Please upload an image");
    }
    formData.append("image", imagesUpload, imagesUpload.name);

    try {
      let response = await postImages(
        formData,
        pageSelected.value,
        imageSelected.value
      );
      alert(response.message);
      setFetchNewImages(true);
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
        <div className="dashboard__images-content-wrapper hidden scroll-y">
          <div className="flex h-auto border-bottom-sm">
            <h4 className="text-primary">Add Image</h4>
          </div>
          <div className="dashboard__form-wrapper w-full ">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="image-input" className="visuallyhidden" />
              <input
                type="file"
                id="image-input"
                aria-label="image upload"
                data-testid="handle-image-change"
                onChange={handleImageOnChange}
                hidden
              />
              <div
                className={`dashboard__form-button-wrapper my-1 flex justify-around`}
              >
                <button
                  className="btn btn-primary m-2"
                  onClick={handleImageUpload}
                  aria-label="handle upload image"
                  id="handle-image-upload"
                >
                  Upload Image
                </button>

                <Dropdown
                  options={pageOptions}
                  onSelectedChange={setPageSelected}
                  selected={pageSelected}
                  label={"page"}
                />

                <Dropdown
                  options={imageOptions}
                  onSelectedChange={setImageSelected}
                  selected={imageSelected}
                  label={"image type"}
                />

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
          <div className="flex h-auto border-tb-2">
            <h4 className="text-primary">Edit Image</h4>
          </div>
          <div
            className="dashboard__images--headings 
      grid border-bottom-sm p-1 text-center hidden"
          >
            <div
              className="dashboard__images--heading 
                dashboard__images--is-mobile text-primary"
            >
              Name
            </div>
            <div
              className="dashboard__images--heading 
                dashboard__images--is-mobile text-primary"
            >
              Created At
            </div>
            <div className="dashboard__images--heading text-primary">Image</div>
            <div className="dashboard__images--heading-page text-primary">
              section
            </div>
            <div className="dashboard__images--heading text-primary"></div>
          </div>
          {/* images content */}

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
                    <>
                      <div
                        className="dashboard__image-name 
                          dashboard__images--is-mobile"
                      >
                        {image.key}
                      </div>
                      <div
                        className="dashboard__images-created-at 
                          dashboard__images--is-mobile"
                      >
                        {image.createdAt}
                      </div>
                    </>
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
                      onClick={() => {
                        setModalInformation({
                          item: image,
                          page: "images",
                          type: "image-content",
                        });
                        showContentModal(true);
                        setToggleContentModal({
                          item: image,
                          page: "images",
                          type: "image-content",
                        });
                      }}
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
      </div>
    </>
  );
};

export default DashboardImages;
