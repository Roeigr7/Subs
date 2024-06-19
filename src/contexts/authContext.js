// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase';

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function googleLogin(email, password) {
    return signInWithPopup(auth, provider);
  }
  function logout() {
    return signOut(auth);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
