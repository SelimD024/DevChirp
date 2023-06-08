import { useState } from "react";
import burger from "./assets/burger.svg";
import avatar from "./assets/avatar.svg";
import Navlogo from "./assets/navigation.svg";
import Hash from "./assets/hash.svg";
import Bookmark from "./assets/bookmark.svg";
import Like from "./assets/Like.svg";
import Chat from "./assets/Chat.svg";
import "./App.css";
function Community() {
  return (
    <>
      <main className="Community">
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
        <section className="Forum">
          <div className="card">
            <div className="header">
              <img src={avatar} alt="React Logo" />
              <div className="card-info">
                <b className="Username">Freddy</b>
                <p className="daysago">29d</p>
              </div>
              <img src={Bookmark} alt="React Logo" />
            </div>
            <div className="body">
              <h2>Welcome 👋</h2>
              <p>
                Welcome to the Abstract user community—we’re glad you’re here.
                This is a space to build community with other enthusiastic and
                knowledgeable ...
              </p>
            </div>
            <div className="footer"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Community;
