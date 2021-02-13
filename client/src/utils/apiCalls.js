import axios from "axios";
axios.defaults.baseURL =
  "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// const BASE_URL_FIREBASE =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5001/bath-creations/europe-west2/app/v1"
//     : "/v1";

export const getContent = async (page) => {
  const { data } = await axios.get(
    `https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content?page=${page}`
  );
  return data;
};

export const getImages = async () => {
  const { data } = await axios.get(
    `https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/images`
  );
  return data;
};
