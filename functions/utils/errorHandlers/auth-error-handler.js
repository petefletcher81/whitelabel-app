exports.authErrorHandler = (error) => {
  switch (error) {
    case "auth/user-not-found":
      return { message: "User not found", status: 404 };
    case "auth/wrong-password":
      return { message: "Invalid password", status: 401 };
    case "auth/argument-error":
      return {
        message: "Something went wrong when authenticating",
        status: 400,
      };
    case "auth/id-token-expired":
      return {
        message: "Something went wrong when authenticating expired",
        status: 400,
      };
    default:
      return { error };
  }
};
