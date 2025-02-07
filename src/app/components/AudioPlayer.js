"use client";
import { useState } from "react";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import { sendStatusCode } from "next/dist/server/api-utils";

export default function AudioPlayer({ song }) {
  const [autoplayOn, setAutoplayOn] = useState(false);
  const handleAutoplay = () => {
    setAutoplayOn(!autoplayOn);
  };

  return (
    <div className="flex items-center flex-col mt-10">
      <h2 className="text-red-500 text-2xl p-1 border-pink-900 rounded-md mb-3">
        Now Playing:
      </h2>

      <h1 className="text-2xl mb-4">
        <span className="text-green-500">{song.name}</span>{" "}
        <span className="text-green-700">by</span>{" "}
        <span className="text-emerald-800">{song.artist}</span>
      </h1>

      {song.imgUrl && (
        <img src={song.imgUrl} className="w-[30vw] h-[30vw] mb-3" />
      )}

      <div className="flex mb-3 mt-3 ">
        <ReactAudioPlayer controls src={song.url} />{" "}
        {autoplayOn ? (
          <button
            onClick={handleAutoplay}
            className="mb-1 mt-1 ml-1.5 text-red-200 opacity-90 bg-red-600 rounded-md pt-.5 pl-1 pr-1 hover:border-2"
          >
            Autoplay
          </button>
        ) : (
          <button
            onClick={handleAutoplay}
            className="mb-1 mt-1 ml-1.5 text-red-100 opacity-90 bg-red-900 rounded-md pt-.5 pl-1 pr-1 hover:border-2"
          >
            Autoplay
          </button>
        )}

      </div>
      <button className="bg-blue-800 rounded-md p-2 hover:border-2">
        Next Song
      </button>

      <Link className="text-blue-500 mt-10 underline " href={song.url}>
        Link to song
      </Link>
    </div>
  );
}
