import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // Add this import
} from "firebase/auth";
import { initFirebase } from "../../firebase/firebase";

const Home = () => {
  initFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-form">
      <div>Login to continue</div>
      <button onClick={handleGoogleSignIn}>
        <div className="bg-red-600 text-white rounded-md p-2 w-48">
          Sign in with Google
        </div>
      </button>
      <div>or</div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailSignIn}>
        <div className="bg-red-600 text-white rounded-md p-2 w-48">
          {isRegistering ? "Register" : "Sign in"} with Email/Password
        </div>
      </button>
      <div>
        <label htmlFor="register-checkbox">
          Register instead of signing in
        </label>
        <input
          id="register-checkbox"
          type="checkbox"
          checked={isRegistering}
          onChange={() => setIsRegistering(!isRegistering)}
        />
      </div>
    </div>
  );
};

export default Home;
