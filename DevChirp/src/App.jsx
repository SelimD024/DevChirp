import { useState } from "react";
import Navbar1 from "./components/navbar1";
import CommunityCard from "./components/CommunityCard";
import "./App.css";
import cardimage from "./assets/cardimage.png";
import Clogo from "./assets/Clogo.png";
import javascriptimage from "./assets/javascript.png";
import javalogo from "./assets/javascriptlogo.png";

const communityData = [
  {
    name: "C#",
    members: "23,600",
    backgroundImage: cardimage,
    logo: Clogo,
  },
  {
    name: "Javascript",
    members: "23,600",
    backgroundImage: javascriptimage,
    logo: javalogo,
  },
  // Add more community objects as needed
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="index">
        <Navbar1 />
        <div className="community-cards bg-black">
          <h1>Top Communities</h1>
          <div className="cards">
            {communityData.map((community) => (
              <CommunityCard
                key={community.name}
                name={community.name}
                members={community.members}
                backgroundImage={community.backgroundImage}
                logo={community.logo}
              />
            ))}
          </div>
        </div>
        {/* More community sections */}
      </main>
    </>
  );
}

export default App;
