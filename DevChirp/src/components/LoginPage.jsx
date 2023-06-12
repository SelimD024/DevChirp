
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initFirebase } from '../../firebase/firebase';

const Home = () => {
    initFirebase
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <div className="text-center flex flex-col gap-4 items-center">
      <div>login om door te gaan</div>
      <button onClick={signIn}>
        <div className="bg-red-600 text-white rounded-md p-2 w-48">Sign in</div>
      </button>
    </div>
  );
};

export default Home;
