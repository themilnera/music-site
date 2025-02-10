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
  const [nextSong, setNextSong] = useState(false);

  const getRandSong = async (lastSong) => {
    try {
      setLoading(true);
      let newSong;

      do {
        newSong = await contextRef.getRandSong();
      } while (newSong.url === lastSong.url);

      setSong(newSong);
      setLoading(false);
    } catch (error) {
      console.error("Random song getting failed", error);
    }
  };

  useEffect(() => {
    getRandSong(song);
  }, [nextSong]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        <AudioPlayer song={song} />
      </div>
      <button
        className="bg-blue-800 rounded-md p-2 hover:border-2 self-start mt-10"
        onClick={() => {
          setNextSong((prev) => !prev);
        }}
      >
        Next Song
      </button>
    </div>
  );
};

export default Listen;
