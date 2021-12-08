import React from "react";
import Layout from "../components/layout/Layout";
import "../styles/App.scss";
import "../styles/Footer.scss";
import "../styles/globals.css";
import "../styles/Homepage.scss";
import "../styles/Navbar.scss";
import "../styles/NavItems.scss";
import "../styles/Sidebar.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
