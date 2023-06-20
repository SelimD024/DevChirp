import { useState, useEffect } from "react";
import Navbar from "../components/navbar2";
import Post from "../components/Posts";
import avatar from "../assets/avatar.svg";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import Vector from "../assets/vector.svg";
import CreatePostModal from "../components/PostModal";
import { Link, useLocation, useHistory } from "react-router-dom";

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
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function formatTimeSincePost(postTime) {
  const currentTime = new Date();
  const timeDiff = Math.abs(currentTime - postTime);

  // Bereken het aantal dagen, uren en minuten sinds de post
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Bepaal het juiste label op basis van de tijdseenheid
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
  const pageName = location.pathname.substring(1); // Get the page name from the URL
  const [user] = useAuthState(getAuth());

  useEffect(() => {
    const db = getFirestore();
    const postsRef = collection(db, "posts"); // Use the generic "posts" collection

    const communityPostsQuery = query(
      postsRef,
      where("community", "==", pageName) // Filter posts based on the community
    );

    const unsubscribe = onSnapshot(communityPostsQuery, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt ? data.createdAt.toDate() : null; // Check if createdAt exists before calling toDate()
        const daysAgo = createdAt ? formatTimeSincePost(createdAt) : ""; // Format the time since the post was created
        posts.push({ id: doc.id, ...data, daysAgo });
      });
      setCards(posts);
    });

    return () => {
      unsubscribe();
    };
  }, [pageName]);

  const createPost = async (postData) => {
    const db = getFirestore();
    const postsRef = collection(db, "posts"); // Use the generic "posts" collection

    try {
      const docRef = await addDoc(postsRef, {
        ...postData,
        community: pageName, // Add the community field to the post data
        userId: user.uid,
        likes: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
        profilePicture: user.photoURL,
      });

      console.log("Post toegevoegd met ID: ", docRef.id);
    } catch (error) {
      console.error("Fout bij het toevoegen van de post: ", error);
    }
  };
  const handleLike = async (postId) => {
    const db = getFirestore();

    try {
      const postRef = doc(db, `${pageName}_posts/${postId}`);
      const docSnap = await getDoc(postRef);

      if (!docSnap.exists()) {
        throw new Error("Post does not exist.");
      }

      let likedBy = docSnap.data().likedBy || [];
      if (!Array.isArray(likedBy)) {
        likedBy = [likedBy];
      }

      if (likedBy.includes(user.uid)) {
        console.log("User has already liked the post.");
        return;
      }

      await runTransaction(db, async (transaction) => {
        transaction.update(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.uid),
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
            <Post
              key={card.id}
              id={card.id}
              username={card.username}
              daysAgo={card.daysAgo}
              title={card.title}
              description={card.description}
              likes={card.likes}
              hashtag={card.hashtag}
              comments={card.comments}
              handleLike={handleLike}
              profilePicture={card.profilePicture}
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
