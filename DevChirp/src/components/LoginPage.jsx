import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initFirebase } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from 'react-router-dom';

const Home = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-center flex flex-col gap-4 items-center">
      <div>Login to continue</div>
      <button onClick={signIn}>
        <div className="bg-red-600 text-white rounded-md p-2 w-48">Sign in</div>
      </button>
    </div>
  );
};

export default Home;
