// JavascriptCommunity.jsx

import { useState } from "react";
import Navbar from "../components/navbar2";
import avatar from "../assets/avatar.svg";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import "../App.css";
import { cardData } from "../Data/cardData"; // Aangepast importpad

function JavascriptCommunity() {
  const [cards] = useState(cardData.javascript); // Gebruik de kaartgegevens voor de C# community
  return (
    <>
      <main className="Community">
        <Navbar pageName="Javascript" />
        <section className="Forum">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <div className="header">
                <img src={avatar} alt="React Logo" />
                <div className="card-info">
                  <b className="Username">{card.username}</b>
                  <p className="daysago">{card.daysAgo}</p>
                </div>
                <img src={Bookmark} alt="React Logo" />
              </div>
              <div className="body">
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </div>
              <div className="footer">
                <div className="inner">
                  <img src={Like} alt="React Logo" /> <span>{card.likes}</span>
                </div>
                <div className="inner">
                  <img src={Comment} alt="React Logo" />{" "}
                  <span>{card.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default JavascriptCommunity;
