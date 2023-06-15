import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
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
    path: "/csharp",
  },
  {
    name: "Javascript",
    members: "23,600",
    backgroundImage: javascriptimage,
    logo: javalogo,
    path: "/javascript",
  },
];

function App() {
  const [count, setCount] = useState(0);
  const [trendingPosts, setTrendingPosts] = useState([]); // Verplaats de useState-hook naar hier

  useEffect(() => {
    const db = getFirestore();
    const trendingPostsRef = collection(db, "trending_posts");

    const unsubscribe = onSnapshot(trendingPostsRef, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setTrendingPosts(posts);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <main className="index">
        <Navbar1 />
        <div className="community-cards bg-black">
          <h1>Top Communities</h1>
          <div className="cards">
            {communityData.map((community) => (
              <Link to={community.path} key={community.name}>
                <CommunityCard
                  name={community.name}
                  members={community.members}
                  backgroundImage={community.backgroundImage}
                  logo={community.logo}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="community-cards bg-black">
          <h1>Trending posts</h1>
          {trendingPosts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {/* Voeg hier de rest van de weergave van de post toe */}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
