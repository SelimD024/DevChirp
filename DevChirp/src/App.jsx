import { useState } from "react";
import burger from "./assets/burger.svg";
import avatar from "./assets/avatar.svg";
import "./App.css";
import headerbackground from "./assets/headerbackground.png";
import cardimage from "./assets/cardimage.png";
import Clogo from "./assets/Clogo.png";
import javascriptimage from "./assets/javascript.png";
import javalogo from "./assets/javascriptlogo.png";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="">
        <div
          className="header"
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
        <div className="community-cards bg-black">
          <h1>Top Communities</h1>
          <div className="cards">
            <div className="card" onClick={() => (window.location.href = '/Community')}>
              <div
                className="top"
                style={{ backgroundImage: `url(${cardimage})` }}
              >
                <div
                  className="card-icon"
                  style={{ backgroundImage: `url(${Clogo})` }}
                ></div>
              </div>
              <div className="bottom">
                <h2>C#</h2>
                <p>23.600 members</p>
              </div>
            </div>
            <div className="card">
              <div
                className="top"
                style={{ backgroundImage: `url(${javascriptimage})` }}
              >
                <div
                  className="card-icon"
                  style={{ backgroundImage: `url(${javalogo})` }}
                ></div>
              </div>
              <div className="bottom">
                <h2>Javascript</h2>
                <p>23.600 members</p>
              </div>
            </div>
          </div>
        </div>
        <div className="community-cards">
          <h1>Design Communities</h1>
          <div className="cards">
            <div className="card">
              <div
                className="top"
                style={{ backgroundImage: `url(${cardimage})` }}
              >
                <div
                  className="card-icon"
                  style={{ backgroundImage: `url(${Clogo})` }}
                ></div>
              </div>
              <div className="bottom">
                <h2>C#</h2>
                <p>23.600 members</p>
              </div>
            </div>
            <div className="card">
              <div
                className="top"
                style={{ backgroundImage: `url(${cardimage})` }}
              >
                <div
                  className="card-icon"
                  style={{ backgroundImage: `url(${Clogo})` }}
                ></div>
              </div>
              <div className="bottom">
                <h2>C#</h2>
                <p>23.600 members</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
