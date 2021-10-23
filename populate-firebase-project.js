const axios = require("axios");

const contentBuilder = () => {
  const footerContent = [
    {
      id: "company",
      companyName: "Big Trees",
      key: "company",
      page: "footer",
      companyAddress: "23 Made Up Street, Somewhere Nice, Awesome Town",
      companyNumber: "12345 678909",
      mobileNumber: "09872234837",
    },
    {
      socialLinkedin: "linkedinurl",
      socialFacebook: "fburl",
      socialInstagram: "instaurl",
      socialPinterest: "pinurl",
      socialTwitter: "twiturl",
      key: "social",
      page: "footer",
      id: "social",
    },
  ];

  const enquiryContent = [
    {
      email: "test1@test.com",
      name: "test",
      createdAt: "2021-01-17T06:25:57.066Z",
      contacted: false,
      key: "test1@test.com",
      page: "enquiries",
    },
    {
      email: "test2@test.com",
      name: "test2",
      createdAt: "2020-01-17T06:25:57.064Z",
      contacted: true,
      key: "test2@test.com",
      page: "enquiries",
    },
  ];

  const homeContent = [
    {
      id: "section-1",
      heading: "Heading 1",
      content: "Lorem ipsum dolor sit amet",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "home",
      position: "1",
    },
    {
      id: "section-2",
      heading: "Heading 2",
      content: "Lorem ipsum dolor sit amet",
      createdAt: "2021-01-17T06:25:57.044Z",
      page: "home",
      position: "2",
    },
    {
      id: "section-3",
      heading: "Heading 3",
      content: "Lorem ipsum dolor sit amet",
      createdAt: "2021-01-30T06:25:57.044Z",
      page: "home",
      position: "3",
    },
  ];

  const contactUsContent = [
    {
      id: "section-1",
      heading: "Heading 1",
      content: "Lorem ipsum dolor adipiscing elit",
      createdAt: "2021-11-07T06:25:57.066Z",
      page: "contactus",
      position: "1",
    },
    {
      id: "section-2",
      heading: "Heading 2",
      content: "Lorem ipsum dolor adipiscing elit",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "contactus",
      position: "2",
    },
  ];

  const aboutUsContent = [
    {
      id: "section-1",
      heading: "Heading 1",
      content: "Lorem ipsum dolor adipiscing elit",
      createdAt: "2021-11-07T06:25:57.066Z",
      page: "aboutus",
      position: "1",
    },
    {
      id: "section-2",
      heading: "Heading 2",
      content: "Lorem ipsum dolor adipiscing elit",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "aboutus",
      position: "2",
    },
  ];

  return {
    homeContent,
    contactUsContent,
    aboutUsContent,
    footerContent,
    enquiryContent,
  };
};

const populateProject = async () => {
  // add all content
  // get url from a .env file that is written at the beginning of the script
  const addContentForPages = async (method, url, body, page) => {
    var config = {
      method,
      url: `http://localhost:5000/test-project1981/europe-west2/app/${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    try {
      const { data } = await axios(config);
      console.log(
        `Content for ${page} ${body.id ? body.id : ""} has been completed`
      );
      console.log(``);
      return data;
    } catch (error) {
      console.log(`${page && page.toUpperCase()}`, error.response.data.message);
    }
  };

  // homepage
  const { homeContent } = contentBuilder();
  homeContent.forEach(async (content) => {
    delete content.createdAt;
    const url = `/content/home/${content.id}?position=${content.position}`;
    await addContentForPages("post", url, content, "home page");
  });

  // aboutus
  const { aboutUsContent } = contentBuilder();
  aboutUsContent.forEach(async (content) => {
    delete content.createdAt;
    const url = `/content/aboutus/${content.id}?position=${content.position}`;
    await addContentForPages("post", url, content, "about us");
  });

  // contactus
  const { contactUsContent } = contentBuilder();
  contactUsContent.forEach(async (content) => {
    delete content.createdAt;
    const url = `/content/contactus/${content.id}?position=${content.position}`;
    await addContentForPages("post", url, content, "contact us");
  });

  const { footerContent } = contentBuilder();
  footerContent.forEach(async (footContent) => {
    delete footContent.createdAt;
    const body = {
      content: {
        ...footContent,
      },
    };
    const url = `/footer/${body.content.id}`;
    await addContentForPages("post", url, body, "footer");
  });

  const { enquiryContent } = contentBuilder();
  enquiryContent.forEach(async (content) => {
    delete content.createdAt;
    const url = `/enquiries`;
    await addContentForPages("post", url, content, "enquiry");
  });
};

populateProject();

// w-app-images
// add homepage images
// add images to gallery
