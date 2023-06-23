import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import Navbar1 from "./components/navbar1";
import "./App.css";
import {
  getFirestore,
  collection,
  where,
  query,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

function Settings() {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      const userId = user.uid || user.user.uid;
      fetchUserPosts(userId);
    }
  }, [user]);

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const fetchUserPosts = async () => {
    try {
      const firestore = getFirestore();
      const postsQuery = query(
        collection(firestore, "csharp_posts"),
        where("userId", "==", user.uid)
      );
      const collectionsSnapshot = await getDocs(postsQuery);
      const userPosts = collectionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(userPosts);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch user posts.");
    }
  };

  const deletePost = async (postId) => {
    try {
      const firestore = getFirestore();
      const postDocRef = doc(firestore, "csharp_posts", postId.toString());

      console.log("Deleting post", postId);

      await deleteDoc(postDocRef);

      setUserPosts((prevUserPosts) =>
        prevUserPosts.filter((post) => post.id !== postId)
      );

      setSuccessMessage("Post deleted successfully.");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to delete post.");
    }
  };

  const saveSettings = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
      });
      setSuccessMessage("Settings saved successfully.");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to save settings.");
    }
  };

  return (
    <>
      <main className="index settings">
        <Navbar1 />

        <div className="settings-content">
          <h2>Settings</h2>

          <div className="settings-form">
            <label>Display Name:</label>
            <input
              type="text"
              value={displayName}
              onChange={handleDisplayNameChange}
              className="searchbar"
            />

            <div className="button-container">
              <button onClick={saveSettings} className="button">
                Save
              </button>
            </div>

            {userPosts.length > 0 && (
              <div className="user-posts">
                <h3>Your Posts:</h3>
                <ul>
                  {userPosts.map((post) => (
                    <li key={post.id}>
                      {post.title}{" "}
                      <button onClick={() => deletePost(post.id)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Settings;
