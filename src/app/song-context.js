"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { db } from "./fb";
import { authContext } from "./auth-context";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  startAt,
  startAfter,
  limit,
  where,
  getDoc,
} from "firebase/firestore/lite";

export const songContext = createContext({
  addSong: async () => {},
  removeSong: async () => {},
  updateSong: async () => {},
  getSong: async () => {},
  getAllSongs: async () => {},
  searchSongs: async () => {},
  getRandSong: async () => {},
});
const generateSubstrings = (str) => {
  const substrings = str.split(" ");
  return substrings;
};

export default function SongContextProvider({ children }) {
  const addSong = async (song) => {
    try {
      const collectionRef = collection(db, "songs");
      const name = song.name.toLowerCase();
      const artist = song.artist.toLowerCase();
      const na = name + " " + artist;
      let substrings = [];
      substrings = generateSubstrings(na);

      const docSnap = await addDoc(collectionRef, {
        name: song.name,
        substrings: substrings,
        artist: song.artist,
        url: song.url,
        imgUrl: song.imgUrl,
        genre: song.genre,
        userId: song.userId,
      });
      return docSnap.id;
    } catch (error) {
      console.error("Error adding song: ", error);
      throw error;
    }
  };

  const getSong = async (id) => {
    try {
      const docRef = doc(db, "songs", id);
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (error) {
      console.error(`Error getting song: ${id}`, error);
    }
  };

  const updateSong = async(id, data)=>{
    try {
      const docRef = doc(db, "songs", id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Failed to update song", error);
    }
  }

  const removeSong = async(id)=>{
    try{
      const docRef = doc(db, "songs", id);
      await deleteDoc(docRef);
      console.log("Deleted doc successfully");
    }
    catch(error){
      console.error("Failed to delete doc", error);
    }
  }


  const getRandSong = async () => {
    try {
      const docRef = collection(db, "songs");
      const docSnap = await getDocs(docRef);

      const songs = [];
      docSnap.forEach((doc) => {
        songs.push(doc.data());
      });
      console.log(`total songs: ` + songs.length);
      const randInt = Math.floor(Math.random() * songs.length);
      console.log(songs);
      return songs[randInt];
    } catch (error) {
      console.error(`Error getting random song`, error);
    }
  };

  const getAllSongs = async (page = 1, pageSize = 10) => {
    try {
      const docRef = collection(db, "songs");
      let q = query(docRef, orderBy("name"), limit(pageSize));
      if (page > 1){
        const offset = (page -1) * pageSize;
        const offSetQuery = query(docRef, orderBy("name"), limit(offset));
        const offsetSnapshot = await getDocs(offSetQuery);
        const lastVisible = offsetSnapshot.docs[offsetSnapshot.docs.length - 1];
        if(lastVisible){
          q = query(docRef, orderBy("name"), startAfter(lastVisible), limit(pageSize));
        }
      }
      const querySnap = await getDocs(q);
      const results = querySnap.docs.map((doc)=> ({id: doc.id, ...doc.data()}))


      return{
        results,
        hasMore: querySnap.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Failed to get all songs", error);
      return {results: [], hasMore: false}
    }
  };

  const searchSongs = async (searchTerm, page = 1, pageSize = 10) => {
    try {
      searchTerm.toLowerCase();
      const docRef = collection(db, "songs");

      let q = query(
        docRef,
        where("substrings", "array-contains", searchTerm),
        orderBy("name"),
        limit(pageSize)
      );

      if (page > 1) {
        const offset = (page - 1) * pageSize;
        const offsetQuery = query(
          docRef,
          where("substrings", "array-contains", searchTerm),
          orderBy("name"),
          limit(offset)
        );
        const offsetSnapshot = await getDocs(offsetQuery);
        const lastVisible =
          offsetSnapshot.docs[(offsetSnapshot.docs.length - 1)];
        q = query(q, startAfter(lastVisible));
      }

      const querySnap = await getDocs(q);
      const results = [];

      querySnap.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      return {
        results,
        hasMore: querySnap.docs.length === pageSize,
      };
    } catch (error) {
      console.error("Error searching:", error);
      return {
        results: [],
        hasMore: false,
      };
    }
  };

  return (
    <songContext.Provider
      value={{ addSong, getSong, removeSong, getAllSongs, searchSongs, getRandSong, updateSong }}
    >
      {children}
    </songContext.Provider>
  );
}
