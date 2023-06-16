import { useState, useEffect } from "react";
import burger from "../assets/burger.svg";
import headerbackground from "../assets/headerbackground.png";
import { Redirect } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar1() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState(null); // Added state for profile image

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    auth.signOut();
    setProfileImage(null); // Reset profile image on sign out
  };

  useEffect(() => {
    if (user) {
      handleProfileImage();
    }
  }, [user]); // Run whenever the user changes

  const handleProfileImage = () => {
    if (user.photoURL) {
      setProfileImage(user.photoURL);
    } else {
      setProfileImage(avatar); // Default profile image
    }
  };

  return (
    <div
      className="main-header"
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
        {user ? (
          <li onClick={signOut}>Sign out</li>
        ) : (
          <li onClick={signIn}>Log in</li>
        )}
        {user && (
          <img src={profileImage} className="profilePicture" alt="Profile" />
        )}
      </div>
      <div className="middle">
        <h1>Hi, {user?.displayName || "Guest"}</h1> {/* Display user's name */}
        <p>Find community by using topics or products</p>
      </div>
      <div className="bottom">
        <input className="searchbar"></input>
      </div>
    </div>
  );
}

export default Navbar1;
