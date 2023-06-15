// CSharp.jsx

import { useState } from "react";
import Navbar from "../components/navbar2";
import avatar from "../assets/avatar.svg";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import { useHistory, Link } from "react-router-dom";
import { cardData } from "../Data/cardData"; // Aangepast importpad

function CSharpCommunity() {
  const [cards] = useState(cardData.csharp); // Gebruik de kaartgegevens voor de C# community

  const history = useHistory();

  const handleCreatePost = async (community) => {
    try {
      const newPost = {
        // Stel hier de gegevens in voor de nieuwe post, inclusief de community-informatie
        community: community,
        // Andere postgegevens...
      };

      // Maak een nieuwe post in de Firestore-database
      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Document written with ID: ", docRef.id);

      // Na het maken van de post kun je de gebruiker doorsturen naar de nieuwe postpagina voor de huidige community
      history.push(`/${community}/new`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <main className="Community">
        <Navbar pageName="C#" />
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
          <button onClick={handleCreatePost}>Maak een nieuwe post</button>
        </section>
      </main>
    </>
  );
}

export default CSharpCommunity;
