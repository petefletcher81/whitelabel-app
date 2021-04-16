import { useState, useEffect } from "react";
import { getContent, getImages } from "../utils/apiCalls";

export const useContentApi = (page) => {
  const [apiResponse, setApiResponse] = useState(null);
  useEffect(() => {
    const getAllContent = async () => {
      try {
        const response = await getContent(page);
        setApiResponse(response);
      } catch (error) {
        const data = error.response?.data;
        setApiResponse(data);
      }
    };
    getAllContent();
  }, []);

  return apiResponse;
};

export const useImageApi = (page) => {
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const getPageImages = async () => {
      try {
        if (page) {
          const response = await getImages(page);
          setApiResponse(response);
        }

        const response = await getAllImages(page);
        setApiResponse(response);
      } catch (error) {
        const data = error.response?.data;
        setApiResponse(data);
      }
    };
    getPageImages();
  }, []);

  return apiResponse;
};
