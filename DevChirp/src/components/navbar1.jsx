import { useState } from "react";
import burger from "../assets/burger.svg";
import avatar from "../assets/avatar.svg";
import headerbackground from "../assets/headerbackground.png";
import { Redirect } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initFirebase } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function Navbar1() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <Redirect to="/" />  ;
  }


  return (
    <div
      className="main-header"
      style={{ backgroundImage: `url(${headerbackground})` }}
    >
      <div className="top">
        <img src={burger} alt="React Logo" />
        <div className="navigation">
          <ul><dialog></dialog>
            <li>Home</li>
            <li>Topics</li>
            < button onClick={signIn}>Log in</button>
            <button onClick={() => auth.signOut()}>Sign out</button>
          </ul>
        </div>
        <img src={avatar} alt="React Logo" />
      </div>
      <div className="middle">
        <h1>Hi, Stijn</h1>
        <p>Find community by using topics or products</p>
      </div>
      <div className="bottom">
        <div className="searchbar"></div>
      </div>
    </div>
  );
}

export default Navbar1;
