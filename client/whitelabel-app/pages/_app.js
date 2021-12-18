import jwtDecode from "jwt-decode";
import React from "react";
import Layout from "../components/layout/Layout";
import "../styles/AboutUs.scss";
import "../styles/App.scss";
import "../styles/ContactUs.scss";
import "../styles/ContentCard.scss";
import "../styles/Dashboard.scss";
import "../styles/Dropdown.scss";
import "../styles/Footer.scss";
import "../styles/Gallery.scss";
import "../styles/globals.css";
import "../styles/Homepage.scss";
import "../styles/Modal.scss";
import "../styles/Navbar.scss";
import "../styles/NavItems.scss";
import "../styles/Sidebar.scss";
import "../styles/SignIn.scss";

export const UserContext = React.createContext({});

function MyApp({ Component, pageProps }) {
  let authenticated;
  let admin;
  let token;

  if (typeof window !== "undefined") {
    token = localStorage?.token;
  }

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      authenticated = false;
    } else {
      authenticated = true;
    }
  }

  if (authenticated === true) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.admin === true) {
      admin = true;
    } else {
      admin = false;
    }
  }

  return (
    <UserContext.Provider value={{ admin }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
