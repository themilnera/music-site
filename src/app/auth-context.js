"use client";

import { createContext } from "react";
import { auth } from "./fb";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "./fb";
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore/lite";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  emailPasswordSignUp: async (email, password) => {},
  emailPasswordLogin: async (email, password) => {},
  addUserDoc: async (user) =>{},
  getUserDoc: async (user) =>{},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider(auth);

  const addUserDoc = async (user) => {
    try {
      // const collectionRef = collection(db, "users");
      // const role = "user";
      if(!user){
        console.log(`user not found ${user}`);
      }
      const userRef = doc(db, "users", user.uid); // Use user's UID as document ID
      console.log(`attempting to add user doc ${userRef}`)
      await setDoc(userRef, {
        email: user.email,
        role: "user",
      });
    } catch (error) {
      console.error("Failed to add userDoc to collection", error);
    }
  };

  const getUserDoc = async (user)=>{
    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data(); // Call .data() as a function
      } else {
        console.error("User document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user doc", error);
    }

  }

  const googleLoginHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return user;
    } catch (error) {
      throw error;
    }
  };
  const emailPasswordSignUp = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      return user;
    } catch (error) {
      throw error;
    }
  };

  const emailPasswordLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const values = {
    user,
    loading,
    googleLoginHandler,
    emailPasswordLogin,
    emailPasswordSignUp,
    logout,
    addUserDoc,
    getUserDoc,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
