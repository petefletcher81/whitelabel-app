import React, { useEffect, useState } from "react";
import { getContent } from "../utils/apiCalls";
import "./style/App.scss";

const App = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const response = await getContent("home");
        setContent(response);
      } catch (error) {
        console.log(error);
      }
    };
    getHomeContent();
  }, []);

  return (
    <>
      <div className="App">
        <nav aria-labelledby="page-navigation" role="navigation">
          <ul>Home</ul>
          <ul>About Us</ul>
          <ul>Contact Us</ul>
        </nav>
        {content &&
          content.map((section, index) => {
            return (
              <div className="content" key={section.id[index]}>
                <div className="content__section-heading" data-testid="test">
                  {section["heading-one"]}
                </div>
              </div>
            );
          })}
        <div className="">This is the body</div>
      </div>
    </>
  );
};
export default App;
