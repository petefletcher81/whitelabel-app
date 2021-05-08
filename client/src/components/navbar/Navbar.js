import React, { useEffect, useRef } from "react";
import NavItems from "../navitems/NavItems";
import "./Navbar.scss";

const Navbar = ({ toggle, handleToggle }) => {
  const mobile = window.innerWidth < 990;
  const ref = useRef();

  if (mobile) {
    useEffect(() => {
      const onBodyClick = (event) => {
        if (ref.current.contains(event.target)) {
          return;
        }
        handleToggle();
      };
      document.body.addEventListener("click", onBodyClick);

      return () => {
        document.body.removeEventListener("click", onBodyClick);
      };
    }, []);
  }

  return (
    <section className="navbar flex" role="menu">
      <div className="container flex mx-1 justify-between w-full">
        <div className="logo heading-sm">Whitelabel Website</div>
        <nav
          aria-labelledby="page-navigation"
          role="navigation"
          className="flex"
        >
          {mobile ? (
            <div
              className="menu-icon"
              role="button"
              onClick={() => {
                const newValue = !toggle;
                handleToggle(newValue);
              }}
              ref={ref}
            >
              <i className="fas fa-2x fa-bars" />
            </div>
          ) : (
            <div>
              <ul className="flex justify-between">
                <NavItems />
              </ul>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
