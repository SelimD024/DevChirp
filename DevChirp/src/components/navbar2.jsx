import { useState } from "react";
import burger from "../assets/burger.svg";
import avatar from "../assets/avatar.svg";
import Navlogo from "../assets/navigation.svg";
import Hash from "../assets/hash.svg";

function Navbar({ pageName }) {
  return (
    <div className="main-header">
      <div className="top">
        <img src={burger} alt="React Logo" className="Hamburger" />
        <div className="navigation">
          <ul>
            <li>
              <b>{pageName}</b>
            </li>
          </ul>
        </div>
        <img src={avatar} alt="React Logo" />
      </div>
      <div className="middle">
        <div className={`Navigation ${pageName === "Home" ? "active" : ""}`}>
          <img src={Navlogo} alt="React Logo" />
        </div>
        <div className={`Navigation ${pageName === "Hash" ? "active" : ""}`}>
          <img src={Hash} alt="React Logo" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
