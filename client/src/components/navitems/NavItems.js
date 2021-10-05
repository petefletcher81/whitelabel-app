import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userSignout } from "../../utils/apiCalls";
import { UserContext } from "../App";
import "./NavItems.scss";

const NavItems = () => {
  const { admin } = useContext(UserContext);
  const [signoutError, setSignoutError] = useState(null);
  const [signoutSuccess, setSignoutSuccess] = useState(null);

  const handleSignout = async () => {
    try {
      const response = await userSignout();
      setSignoutSuccess(response.message);
      localStorage.removeItem("token");
      // TODO - ensure that the message disappears
    } catch (error) {
      const message = error.response?.data?.message;
      setSignoutError(message);
      // log data somewhere
    }
  };

  return (
    <>
      <div className="navitem flex">
        <li role="menuitem" aria-label="home navigation">
          <Link to="/">Home</Link>
        </li>
        <li role="menuitem" aria-label="about us navigation">
          <Link to="aboutus">About Us</Link>
        </li>
        <li role="menuitem" aria-label="contact us navigation">
          <Link to="/contactus">Contact Us</Link>
        </li>
        {admin && !signoutSuccess && (
          <>
            <li role="menuitem" aria-label="dashboard navigation">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li
              role="menuitem"
              aria-label="sign out button"
              onClick={handleSignout}
            >
              <button className="btn btn-primary">
                <i
                  role="img"
                  aria-label="sign out icon"
                  className="fas fa-sign-out-alt"
                ></i>
              </button>
            </li>
          </>
        )}
      </div>
      {signoutError && <div className="w-full">{signoutError}</div>}
      {signoutSuccess && <div className="w-full">{signoutSuccess}</div>}
    </>
  );
};

export default NavItems;
