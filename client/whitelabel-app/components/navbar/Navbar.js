import React, { useEffect, useRef } from "react";
import NavItems from "../navitems/NavItems";

const Navbar = ({ toggle, handleToggle }) => {
  const ref = useRef();

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

  return (
    <section className="navbar" role="menu">
      <div className="flex mx-1 justify-between w-full">
        <div className="logo heading-sm font-bold">Whitelabel Website</div>
        <nav
          aria-labelledby="page-navigation"
          role="navigation"
          className="flex"
        >
          <div
            className="navbar__menu-icon"
            role="button"
            onClick={() => {
              const newValue = !toggle;
              handleToggle(newValue);
            }}
            ref={ref}
          >
            <i className="fas fa-2x fa-bars" />
          </div>
          <ul className="navbar__navitems flex justify-between">
            <NavItems />
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
