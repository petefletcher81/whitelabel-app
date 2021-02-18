import React from "react";

const ContentError = ({ error }) => {
  return <div className="content-error">{error.message}</div>;
};

export default ContentError;
