import React from "react";
import "./header.css";
import fullLogo from "../../img/full-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__content-center">
        <img
          src={fullLogo}
          alt="stenxible logo"
          className="header__app-logo"
        ></img>
      </div>
    </header>
  );
};

export default Header;
