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
      id: "section-one",
      heading: "Heading 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      createdAt: "2021-01-17T06:25:57.066Z",
    },
    {
      id: "section-two",
      heading: "Heading 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      image: "https://test-for-contactus",
    },
  ];

  return { enquiryContent, allContent, imageContent };
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
