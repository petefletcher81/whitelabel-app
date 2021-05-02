import React, { useState } from "react";
import { attemptSignIn } from "../../utils/apiCalls";

const SignIn = () => {
  const [signIn, setSignIn] = useState({ password: "", email: "" });
  const [success, setSuccess] = useState(null);
  const [signInError, setSignInError] = useState(null);

  const onChangeFormDetails = (event) => {
    const { name, value } = event.target;
    setSignIn({ ...signIn, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signInRes = await attemptSignIn(signIn);
      setSuccess(true);
      window.location.href = "/";
      console.log("dispatch here");
    } catch (error) {
      const data = error.response?.data;
      setSignInError(data);
    }
  };

  return (
    <>
      <form data-testid="signin-form">
        <div className="signin-form--controls form-control">
          <label htmlFor="email" className="visuallyhidden" />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={onChangeFormDetails}
            required
          />
        </div>
        <div className="signin-form--controls form-control">
          <label htmlFor="password" className="visuallyhidden" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChangeFormDetails}
            required
          />
          {success && (
            <div className="signin-form--success">Sign In Successful</div>
          )}
          {signInError && (
            <div className="signin-form-error">
              {`${signInError.error}, please try again`}
            </div>
          )}
        </div>
        <label htmlFor="submit" className="visuallyhidden" />
        <input
          type="submit"
          value="Sign In"
          className="btn btn-primary"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

export default SignIn;
