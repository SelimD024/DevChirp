import { useState } from "react";
import Navbar from "./components/navbar2";
import avatar from "./assets/avatar.svg";

import Bookmark from "./assets/bookmark.svg";
import Like from "./assets/Like.svg";
import Comment from "./assets/Chat.svg";
import "./App.css";
function Community() {
  return (
    <>
      <main className="Community">
        <Navbar />
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
            <div className="footer">
              <div className="inner">
                <img src={Like} alt="React Logo" /> <p>4</p>
              </div>
              <div className="inner">
                <img src={Comment} alt="React Logo" /> <p>21</p>
              </div>
            </div>
          </div>
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
            <div className="footer">
              <div className="inner">
                <img src={Like} alt="React Logo" /> <p>4</p>
              </div>
              <div className="inner">
                <img src={Comment} alt="React Logo" /> <p>21</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Community;
