import nock from "nock";
// just exports different mock data
export const contentBuilder = () => {
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

  const allContent = [
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
      id: "section-2",
      heading: "Heading 2",
      content: "Lorem ipsum dolor adipiscing elit",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "aboutus",
      position: "1",
    },
    {
      id: "section-2",
      heading: "Heading 2",
      content: "Lorem ipsum dolor sit amet, consectetur",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "contactus",
      position: "2",
    },
    {
      id: "section-3",
      heading: "New Heading",
      content: "Lorem ipsum dolor sit amet, consectetur",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "contactus",
      position: "2",
    },
    {
      id: "section-1",
      heading: "Heading 1",
      content: "Lorem ipsum dolor sit amet, consectetur",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "contactus",
      position: "1",
    },
  ];

  const imageContent = [
    {
      id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
      name: "brook-anderson-1M5W_Gni_N4-unsplash.jpg",
      createdAt: "2021-01-31T06:46:28.741Z",
      section: "home",
      image: "https://test-for-home",
      key: "test-filename",
      position: "1",
    },
    {
      id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
      name: "brook-anderson-gTQbZXL417Q-unsplash.jpg",
      section: "contactus",
      createdAt: "2021-01-31T06:46:28.442Z",
      banner: "https://test-for-contactus",
      key: "test-filename-2",
      position: "2",
    },
    {
      id: "2bed3fc0-2a17-4987-8460-0dc8ab4e32a2",
      name: "cindy-chen--7nnXc4jBWU-unsplash.jpg",
      section: "aboutus",
      createdAt: "2021-01-31T06:46:28.342Z",
      image: "https://test-for-aboutus",
      key: "test-filename-3",
    },
    {
      id: "2bed3fc0-2a17-4987-460-0dc8ab4e32a2",
      name: "gallery-test",
      section: "aboutus",
      createdAt: "2021-01-31T06:46:28.42Z",
      gallery: "https://test-for-aboutus-gallery",
      key: "test-filename-4",
    },
  ];

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
  return { enquiryContent, allContent, imageContent, footerContent };
};

// nock get request helper
export const nockGetHelper = (endpoint, content) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
  )
    .get(`/${endpoint}`)
    .reply(200, content, {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    });
};

export const nockError = (endpoint) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
  )
    .get(`/${endpoint}`)
    .reply(
      400,
      {
        message: "Something went wrong while trying to add or get the content",
      },
      {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      }
    );
};

export const nockErrorDelete = (endpoint) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
  )
    .delete(`/${endpoint}`)
    .reply(
      400,
      {
        message: "Something went wrong while trying to add or get the content",
      },
      {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      }
    );
};

export const nockErrorPut = (endpoint) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
  )
    .put(`/${endpoint}`)
    .reply(
      400,
      {
        message: "Something went wrong while trying to add or get the content",
      },
      {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      }
    );
};

export const nockOptions = (endpoint) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
    { encodedQueryParams: true }
  )
    .options(`/${endpoint}`)
    .reply(204, "", [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Origin",
      "http://localhost",
      "Function-Execution-Id",
      "kjhihbselwqn",
      "Vary",
      "Origin, Access-Control-Request-Headers",
      "X-Powered-By",
      "Express",
      "X-Cloud-Trace-Context",
      "5e2b7854479c3fbde7a593afd65d73c4;o=1",
      "Date",
      "Mon, 24 May 2021 15:24:24 GMT",
      "Content-Type",
      "text/html",
      "Server",
      "Google Frontend",
      "Content-Length",
      "0",
      "Alt-Svc",
      'h3-29=":443"; ma=2592000,h3-T051=":443"; ' +
        'ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ' +
        'ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ' +
        'ma=2592000; v="46,43"',
    ]);
};

export const nockPostMock = (postData, endpoint, content) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
    { encodedQueryParams: true }
  )
    .post(`/${endpoint}`, postData)
    .reply(201, content, [
      "Access-Control-Allow-Origin",
      "http://localhost",
      "Content-Type",
      "application/json; charset=utf-8",
    ]);
};

export const nockPutMock = (postData, endpoint, content) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net",
    { encodedQueryParams: true }
  )
    .put(`/app/${endpoint}`, postData)
    .reply(201, content, [
      "Access-Control-Allow-Origin",
      "http://localhost",
      "Content-Type",
      "application/json; charset=utf-8",
      "Etag",
      'W/"40-BOkEAWHce/ES7VATl+foZS1hWJQ"',
      "Function-Execution-Id",
      "Vary",
    ]);
};

export const nockDeleteMock = (endpoint, content) => {
  return nock(
    "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net",
    { encodedQueryParams: true }
  )
    .delete(`/app/${endpoint}`)
    .reply(200, content, [
      "Access-Control-Allow-Origin",
      "http://localhost",
      "Content-Type",
      "application/json; charset=utf-8",
      "Etag",
      'W/"40-BOkEAWHce/ES7VATl+foZS1hWJQ"',
      "Function-Execution-Id",
      "Vary",
    ]);
};
