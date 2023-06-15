import { useState, useEffect } from "react";
import Navbar from "../components/navbar2";
import avatar from "../assets/avatar.svg";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import Vector from "../assets/vector.svg";
import { Link, useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
  runTransaction,
  arrayUnion,
  arrayRemove,
  getDoc,
  increment,
} from "firebase/firestore";

import CreatePostModal from "../components/PostModal";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function JavascriptCommunity() {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageName = location.pathname.substring(1); // Get the page name from the URL
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    const db = getFirestore();
    const postRef = collection(db, `${pageName}_posts`); // Use the page name to construct the collection name

    const unsubscribe = onSnapshot(postRef, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      setCards(posts);
    });

    return () => {
      unsubscribe();
    };
  }, [pageName]);

  const createPost = async (postData) => {
    const db = getFirestore();
    const postRef = collection(db, `${pageName}_posts`); // Use the page name to construct the collection name

    try {
      const docRef = await addDoc(postRef, {
        ...postData,
        likes: 0,
        likedBy: [],
      }); // Voeg likes: 0 en likedBy: [] toe aan de postgegevens
      console.log("Post toegevoegd met ID: ", docRef.id);
    } catch (error) {
      console.error("Fout bij het toevoegen van de post: ", error);
    }
  };

  const handleLike = async (postId) => {
    const db = getFirestore();
    const postRef = doc(collection(db, `${pageName}_posts`), postId);
    const currentUserUid = user.uid;
  
    try {
      const docSnap = await getDoc(postRef);
      if (!docSnap.exists()) {
        throw new Error("Post does not exist.");
      }
  
      let likedBy = docSnap.data().likedBy || []; // Initialize likedBy as an array if it's undefined or not an array
      if (!Array.isArray(likedBy)) {
        likedBy = [likedBy]; // Convert to an array with a single element
      }
  
      if (likedBy.includes(currentUserUid)) {
        console.log("User has already liked the post.");
        return;
      }
  
      await runTransaction(db, async (transaction) => {
        transaction.update(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(currentUserUid),
        });
      });
  
      console.log("Like added.");
    } catch (error) {
      console.error("Error updating the number of likes: ", error);
    }
  };

  return (
    <>
      <main className="Community">
        <Navbar pageName={pageName} />
        <section className="Forum">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <div className="header">
                <img src={avatar} alt="React Logo" />
                <div className="card-info">
                  <h2 className="Username">{card.username}</h2>
                  <p className="daysago">{card.daysAgo}</p>
                </div>
                <img src={Bookmark} alt="React Logo" />
              </div>
              <div className="body">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <div className="footer">
                <div className="inner">
                  <img
                    src={Like}
                    alt="React Logo"
                    onClick={() => handleLike(card.id)} // Voeg de onClick-handler toe aan de afbeelding
                    style={{ cursor: "pointer" }} // Voeg een cursorstijl toe om aan te geven dat het klikbaar is
                  />
                  <span>{card.likes}</span>
                </div>

                <div className="inner">
                  <img src={Comment} alt="React Logo" />{" "}
                  <span>{card.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
        {user && (
          <button className="modalbutton" onClick={() => setIsModalOpen(true)}>
            <h2><img src={Vector} alt="React Logo" /></h2>
            <h2>Maak een nieuwe post</h2>
          </button>
        )}
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={createPost}
        />
      </main>
    </>
  );
}

export default JavascriptCommunity;
