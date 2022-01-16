import axios from "axios";
axios.defaults.baseURL =
  // "http://localhost:5001/whitelabel-website-7d72b/europe-west2/app";
  "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

let token = "";
if (typeof window !== "undefined" && document?.cookie) {
  if (document.cookie.includes(";")) {
    token = document.cookie.split(";").split("=")[1];
  }
  token = document.cookie.split("=");
}

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

export const passwordReset = async () => {
  // TODO - need a back off function for bots1
  const { data } = await axios.post(`/password-reset`, {
    email: "petefletch81@gmail.com",
  });
  return data;
};

export const userSignout = async () => {
  // TODO - need a back off function for bots1
  document.cookie = "token=";
  window.location.href = "/";
  const { data } = await axios.post(`/signout`, {});
  return data;
};

export const updateImageContent = async (
  page,
  updatedContent,
  section,
  position
) => {
  const addQuery = position ? `?position=${position}` : "";
  const { data } = await axios.put(
    `/images/${page}/${section}${addQuery}`,
    updatedContent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const updateData = async (page, updatedContent, section) => {
  let url = `/${page}/${section}`;

  if (page === "enquiries") {
    url = `/${page}`;
  }

  const { data } = await axios.put(url, updatedContent, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updatePageContent = async (
  page,
  updatedContent,
  section,
  position
) => {
  const addQuery = position ? `?position=${position}` : "";
  const { data } = await axios.put(
    `/content/${page}/${section}${addQuery}`,
    updatedContent,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deleteContent = async (page, section) => {
  const { data } = await axios.delete(`/content/${page}/${section}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteItem = async (page, section) => {
  let url = `/${page}/${section}`;

  if (page === "enquiries") {
    url = `/${page}`;
  }

  const { data } = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const postImages = async (formData, page, imageType) => {
  const { data } = await axios.post(`/images/${page}/${imageType}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return data;
};
