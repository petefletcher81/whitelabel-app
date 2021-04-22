import axios from "axios";
axios.defaults.baseURL =
  // "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app";
  "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// const BASE_URL_FIREBASE =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app"
//     : "/v1";

export const getContent = async (page) => {
  const { data } = await axios.get(`/content?page=${page}`);
  return data;
};

export const getAllImages = async () => {
  const { data } = await axios.get(`/images`);
  return data;
};

export const getImages = async (page) => {
  const { data } = await axios.get(`/images/${page}/image`);
  return data;
};
export const getFooterContent = async () => {
  const { data } = await axios.get(`/footer`);
  return data;
};

export const addEnquiry = async (enquiryData) => {
  // TODO - need a back off function for bots
  const { name, email } = enquiryData;
  const { data } = await axios.post(`/enquiries`, { name, email });
  return data;
};
