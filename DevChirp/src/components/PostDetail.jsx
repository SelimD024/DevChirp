import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar2";
import Bookmark from "../assets/bookmark.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Chat.svg";
import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  runTransaction,
  getDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const pageName = location.pathname.substring(1); 

  const handleLike = async (postId) => {
    const db = getFirestore();

    try {
      const postRef = doc(db, `posts/${postId}`);
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

  useEffect(() => {
    const getPost = async () => {
      const db = getFirestore();

      const pageName = "posts";
      const postsRef = collection(db, pageName);
      const postQuery = query(
        postsRef,
        where("id", "==", parseInt(postId, 10))
      ); 

      try {
        const querySnapshot = await getDocs(postQuery);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const postData = doc.data();
            console.log("Post data:", postData);
            setPost(postData);
          });
        } else {
          console.log("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
      }
    };

    getPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <main className="Community">
      <Navbar isDetailed={true} pageName={pageName} />
      <section className="Forum">
        <div className="card" key={post.id}>
          <div className="header">
            <img
              src={post.profilePicture || post.avatar} 
              alt="Profile Picture"
              onClick={() => history.push("/")}
              className="Post_profilepicture"
            />

            <div className="card-info">
              <h2 className="Username">{post.username}</h2>
              <p className="daysago">{post.daysAgo}</p>
            </div>
            <img src={Bookmark} alt="React Logo" />
          </div>
          <div className="body">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
          <div className="footer">
            <div className="inner">
              <div className="likes">
                {" "}
                <img
                  src={Like}
                  alt="React Logo"
                  onClick={() => handleLike(post.id)} // Uncomment this line to call handleLike function
                  style={{ cursor: "pointer" }}
                />
                <span>{post.likes}</span>
              </div>
              <div className="comments">
                {" "}
                <img src={Comment} alt="React Logo" />{" "}
                <span>{post.comments}</span>
                <span>{post.likes}</span>
              </div>
            </div>

            <div className="inner">
              <span className="tags">#{post.hashtag}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PostDetail;
