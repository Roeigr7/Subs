import { googleAuthProvider } from "firebase";
import { signInWithPopup } from "firebase/auth";

const startLogin = () => {
  return () => {
    return signInWithPopup(googleAuthProvider);
  };
};
