// app page
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import Navbar1 from "./components/navbar1";
import CommunityCard from "./components/CommunityCard";
import "./App.css";
import cardimage from "./assets/cardimage.png";
import Clogo from "./assets/Clogo.png";
import javascriptimage from "./assets/javascript.png";
import javalogo from "./assets/javascriptlogo.png";
import Post from "./components/Posts";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => doc.data());
      setPosts(postData);
    });

    return unsubscribe;
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
          <h1> Show posts here</h1>
          {posts.map((post) => (
            <Post
              key={post.id}
              username={post.username}
              daysAgo={post.daysAgo}
              title={post.title}
              description={post.description}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
