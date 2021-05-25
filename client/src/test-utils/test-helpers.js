import nock from "nock";
// just exports different mock data
export const contentBuilder = () => {
  const enquiryContent = [
    {
      email: "test1@test.com",
      name: "test",
      createdAt: "2021-01-17T06:25:57.066Z",
    },
  ];

  const allContent = [
    {
      id: "section-1",
      heading: "Heading 1",
      content: "Lorem ipsum dolor sit amet",
      createdAt: "2021-01-17T06:25:57.066Z",
    },
    {
      id: "section-2",
      heading: "Heading 2",
      content: "Lorem ipsum dolor adipiscing elit",
      createdAt: "2021-01-17T06:25:57.066Z",
    },
    {
      id: "section-1",
      heading: "New Heading",
      content: "Lorem ipsum dolor sit amet, consectetur",
      createdAt: "2021-01-17T06:25:57.066Z",
    },
  ];

  const imageContent = [
    {
      id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
      createdAt: "2021-01-31T06:46:28.741Z",
      section: "home",
      image: "https://test-for-home",
    },
    {
      id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
      section: "contactus",
      createdAt: "2021-01-31T06:46:28.742Z",
      banner: "https://test-for-contactus",
    },
    {
      id: "2bed3fc0-2a17-4987-8460-0dc8ab4e32a2",
      section: "aboutus",
      createdAt: "2021-01-31T06:46:28.742Z",
      image: "https://test-for-aboutus",
    },
  ];
  const footerContent = [
    {
      id: "company",
      companyName: "Big Trees",
    },
    {
      id: "social",
      socialLinkedin: "linkedinurl",
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
