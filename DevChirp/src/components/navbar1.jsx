import { useState } from "react";
import burger from "../assets/burger.svg";
import avatar from "../assets/avatar.svg";
import headerbackground from "../assets/headerbackground.png";

function Navbar1() {
  return (
    <div
      className="main-header"
      style={{ backgroundImage: `url(${headerbackground})` }}
    >
      <div className="top">
        <img src={burger} alt="React Logo" />
        <div className="navigation">
          <ul>
            <li>Home</li>
            <li>Topics</li>
          </ul>
        </div>
        <img src={avatar} alt="React Logo" />
      </div>
      <div className="middle">
        <h1>Hi, Stijn</h1>
        <p>Find community by using topics or products</p>
      </div>
      <div className="bottom">
        <div className="searchbar"></div>
      </div>
    </div>
  );
}

export default Navbar1;
