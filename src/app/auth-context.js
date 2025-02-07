"use client";

import { createContext } from "react";
import { auth } from "./fb";
import { GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const authContext = createContext({
  user: null,
  loading: false,
  googleLoginHandler: async () => {},
  emailPasswordSignUp: async (email, password) => {},
  emailPasswordLogin: async (email, password) =>{},
  logout: async () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider(auth);

  const googleLoginHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      throw error;
    }
  };
  const emailPasswordSignUp = async (email, password)=>{
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
  };

  const emailPasswordLogin = async (email, password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error){
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
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
