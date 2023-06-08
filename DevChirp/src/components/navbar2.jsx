import { useState } from "react";
import burger from "../assets/burger.svg";
import avatar from "../assets/avatar.svg";
import Navlogo from "../assets/navigation.svg";
import Hash from "../assets/hash.svg";

function Navbar() {
  return (
    <div className="main-header">
      <div className="top">
        <img src={burger} alt="React Logo" className="Hamburger" />
        <div className="navigation">
          <ul>
            <li>
              <b>JavaScript</b>
            </li>
          </ul>
        </div>
        <img src={avatar} alt="React Logo" />
      </div>
      <div className="middle">
        <div className="Navigation active">
          <img src={Navlogo} alt="React Logo" />
        </div>
        <div className="Navigation">
          <img src={Hash} alt="React Logo" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
