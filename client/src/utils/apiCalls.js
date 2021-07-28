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
  const { data } = await axios.get(`/content/${page}`);
  return data;
};

export const getAllContent = async () => {
  const { data } = await axios.get(`/content`);
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

export const getBanners = async (page) => {
  const { data } = await axios.get(`/images/${page}/banner`);
  return data;
};

export const getFooterContent = async () => {
  const { data } = await axios.get(`/footer`);
  return data;
};

export const getEnquiries = async () => {
  const { data } = await axios.get(`/enquiries`);
  return data;
};

export const addEnquiry = async (enquiryData) => {
  // TODO - need a back off function for bots
  const { name, email } = enquiryData;
  const { data } = await axios.post(`/enquiries`, { name, email });
  return data;
};

export const attemptSignIn = async (siginInData) => {
  // TODO - need a back off function for bots1
  const { password, email } = siginInData;
  const { data } = await axios.post(`/admin`, { password, email });
  return data;
};

export const updateContent = async (page, updatedContent, section) => {
  const { data } = await axios.put(
    `/content/${page}/${section}`,
    updatedContent
  );
  return data;
};

export const updateData = async (page, updatedContent, section) => {
  const { data } = await axios.put(`/${page}/${section}`, updatedContent);
  return data;
};

export const deleteContent = async (page, section) => {
  const { data } = await axios.delete(`/content/${page}/${section}`);
  return data;
};

export const deleteItem = async (page, section) => {
  const { data } = await axios.delete(`/${page}/${section}`);
  return data;
};

export const postImages = (formData, page, imageType) => {
  var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
    mode: "cors",
  };

  const response = fetch(
    `https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/images/${page}/${imageType}`,
    requestOptions
  )
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        console.log("DATA OK", data);
        return data;
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
  return response;
};
