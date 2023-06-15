import { useState, useEffect } from "react";
import burger from "../assets/burger.svg";
import avatar from "../assets/avatar.svg";
import Navlogo from "../assets/navigation.svg";
import Hash from "../assets/hash.svg";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar({ pageName }) {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState(null); // Added state for profile image

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
              <b>{pageName}</b>
            </li>
          </ul>
        </div>
        {user && (
          <img src={profileImage} alt="Profile" className="profilePicture" />
        )}
      </div>
      <div className="middle">
        <div className={`Navigation ${pageName === "Home" ? "active" : ""}`}>
          <img src={Navlogo} alt="React Logo" />
        </div>
        <div className={`Navigation ${pageName === "Hash" ? "active" : ""}`}>
          <img src={Hash} alt="React Logo" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
