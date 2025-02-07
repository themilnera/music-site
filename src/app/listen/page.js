"use client";
import AudioPlayer from "../components/AudioPlayer";
import { useEffect, useState, useContext } from "react";
import { songContext } from "../song-context";

const dummySong = {
  name: "song",
  artist: "god",
  url: "https://ia800709.us.archive.org/17/items/OTRR_Falcon_Singles/01%20The%20Falcon%20Audio%20Brief.mp3",
  imgUrl:
    "https://ia800709.us.archive.org/17/items/OTRR_Falcon_Singles/OTRR_Falcon_Singles.jpg?cnt=0",
};

const Listen = () => {
  const [song, setSong] = useState(dummySong);
  const contextRef = useContext(songContext);
  const [loading, setLoading] = useState(true);

  const getRandSong = async () => {
    try {
      setLoading(true);
      const s = await contextRef.getRandSong();
      console.log(s);
      setSong(s);
      setLoading(false);
    } catch (error) {
      console.error("Random song getting failed", error);
    }
  };
  /////useEffect to get the song?
  //trying to return random song, something wrong with song useState
  useEffect(() => {
    getRandSong();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <AudioPlayer song={song} />
    </div>
  );
};

export default Listen;
