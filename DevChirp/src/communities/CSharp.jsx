import { useState, useEffect } from "react";
import Navbar from "../components/navbar2";
import Post from "../components/Posts";
import Vector from "../assets/vector.svg";
import CreatePostModal from "../components/PostModal";
import { useLocation, useHistory } from "react-router-dom";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  runTransaction,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
  arrayUnion, // Import arrayUnion
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function formatTimeSincePost(postTime) {
  const currentTime = new Date();
  const timeDiff = Math.abs(currentTime - postTime);

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}u`;
  } else {
    return `${minutes}m`;
  }
}

function CSharpCommunity() {
  const location = useLocation();
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageName = location.pathname.substring(1);
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    const db = getFirestore();
    const postRef = collection(db, `${pageName}_posts`);

    const unsubscribe = onSnapshot(postRef, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : null;
        const daysAgo = createdAt ? formatTimeSincePost(createdAt) : "";
        return { id: doc.id, ...data, daysAgo };
      });
      setCards(posts);
    });

    return unsubscribe;
  }, [pageName]);

  const history = useHistory();

  const createPost = async (postData) => {
    const db = getFirestore();
    const postRef = collection(db, `${pageName}_posts`);

    try {
      const docRef = await addDoc(postRef, {
        ...postData,
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
      });
      console.log("Post toegevoegd met ID: ", docRef.id);
    } catch (error) {
      console.error("Fout bij het toevoegen van de post: ", error);
    }
  };
  

  return (
    <>
      <main className="Community">
        <Navbar pageName={pageName} />
        <section className="Forum">
          {cards.map((card) => (
            <Post
              key={card.id}
              id={card.id}
              username={card.username}
              daysAgo={card.daysAgo}
              title={card.title}
              description={card.description}
              likes={card.likes}
              comments={card.comments}
            />
          ))}
        </section>
        {user && (
          <button className="modalbutton" onClick={() => setIsModalOpen(true)}>
            <h2>
              <img src={Vector} alt="React Logo" />
            </h2>
            <h2>Nieuwe post</h2>
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

export default CSharpCommunity;
