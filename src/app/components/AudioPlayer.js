"use client";
import { useState, useContext, useEffect } from "react";
import { authContext } from "../auth-context";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";
import { sendStatusCode } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import { songContext } from "../song-context";
import { useRouter } from "next/navigation";

export default function AudioPlayer({ song }) {
  const [autoplayOn, setAutoplayOn] = useState(false);
  const { user, getUserDoc } = useContext(authContext);
  const { removeSong } = useContext(songContext);
  const [userRole, setUserRole] = useState("user");
  const router = useRouter();
  const params = useParams();

  const handleAutoplay = () => {
    setAutoplayOn(!autoplayOn);
  };

  const handleRemove = async () => {
    try {
      const id = params.id;
      await removeSong(id);
      console.log("Deleted song");
      router.push("/");
    } catch (error) {
      console.error("failed to delete song", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const id = params.id;
      router.push(`/update/${id}`);
    } catch (error) {
      console.error("redirect to update page failed", error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      console.log(user);
      if (user) {
        const userData = await getUserDoc(user);
        if (userData) {
          setUserRole(userData.role);
          console.log(`User ${userData.email} is ${userData.role}`);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  return (
    <div className="flex items-center flex-col mt-10">
      <h2 className="text-red-500 text-2xl p-1 border-pink-900 rounded-md mb-3">
        Now Playing:
      </h2>

      <h1 className="text-2xl mb-4">
        <span className="text-green-500">{song.name}</span>{" "}
        <span className="text-green-700">by</span>{" "}
        <span className="text-emerald-800">{song.artist}</span>
        <span className="text-blue-800 ml-2">({song.genre})</span>

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
        {userRole === "admin" && (
          <>
            <button className="ml-2 text-red-600" onClick={handleRemove}>
              Delete
            </button>
            <button className="ml-2 text-green-600" onClick={handleUpdate}>
              Update
            </button>
          </>
        )}
      </div>

      <Link className="text-blue-500 mt-10 underline " href={song.url}>
        Link to song
      </Link>
    </div>
  );
}
