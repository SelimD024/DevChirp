import { useState, useEffect } from "react";
import burger from "../assets/burger.svg";
import avatar from "../assets/avatar.svg";
import Navlogo from "../assets/navigation.svg";
import Hash from "../assets/hash.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar({ pageName, isDetailed }) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
    <div className="main-header">
      <div className="top">
        <img src={burger} alt="React Logo" className="Hamburger" />
        <div className="navigation">
          <ul>
            <li>
              <b
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                {pageName}
              </b>
            </li>
          </ul>
        </div>
        {user ? null : <li onClick={signIn}>Log in</li>}

        {user && (
          <div className="profileContainer">
            <img
              src={profileImage}
              className="profilePicture"
              alt="Profile"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown">
                <ul>
                  <li
                    onClick={() => {
                      window.location.href = "/settings";
                    }}
                  >
                    Settings
                  </li>
                  <li onClick={signOut}>Sign out</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      {isDetailed ? null : (
        <div className="middle">
          <div className={`Navigation ${pageName === "Home" ? "active" : ""}`}>
            <img src={Navlogo} alt="React Logo" />
          </div>
          <div className={`Navigation ${pageName === "Hash" ? "active" : ""}`}>
            <img src={Hash} alt="React Logo" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
