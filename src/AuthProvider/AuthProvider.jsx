import React from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user function
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in function
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //sign in with google function
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // set observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      fetch("http://localhost:3000/getToken", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: currentUser?.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("token response:", data);

          // store token in local storage
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
          } else {
            localStorage.removeItem("accessToken");
          }
        });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // sign out function
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // auth info object
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </>
  );
};

export default AuthProvider;
