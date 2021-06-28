exports.dateFormatter = () => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Date();
  return formattedDate.toLocaleDateString("en-EN", options);
};
