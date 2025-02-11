"use client";
import { useParams } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { authContext } from "@/app/auth-context";
import { songContext } from "@/app/song-context";
import { useRouter } from "next/navigation";

export default function Update() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const { user, getUserDoc } = useContext(authContext);
  const { getSong, updateSong } = useContext(songContext);
  const [userRole, setUserRole] = useState("user");

  //the current song data
  const [song, setSong] = useState(undefined);

  //for input fields
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
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

  useEffect(() => {
    const fetchCurrentSong = async () => {
      try {
        const s = await getSong(id);
        setSong(s);
      } catch (error) {
        console.error("Failed to fetch current song", error);
      }
    };
    fetchCurrentSong();
  }, [song]);

  //fetch song info, and populate the fields with current song info
  //add form so when you submit you submit an edit,
  //redirect back to the now edited song page
  //also reminder to move firebase stuff to a .env

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.uid;

    const newSong = {
      name: songName,
      artist: artistName,
      url: audioUrl,
      imgUrl: artworkUrl,
      genre: genre,
      userId: userId,
    };


    //any empty fields should default to original values
    if(songName == ""){
      newSong.name = song.name;
    }
    if(artistName == ""){
      newSong.artist = song.artist;
    }
    if(audioUrl == ""){
      newSong.url = song.url;
    }
    if(artworkUrl == ""){
      newSong.imgUrl = song.imgUrl;
    }
    if(genre == ""){
      newSong.genre == song.genre;
    }
    if(userId == ""){
      newSong.userId == song.userId;
    }

    console.log(newSong);
    try {
      await updateSong(id, newSong);
      router.push(`/listen/${id}`);
    } catch (error) {
      console.error("Failed to update song", error);
    }
  };

  return (
    <>
      {userRole === "admin" ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <h1>Song Update</h1>
          <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              placeholder={song?.name}
              value={songName || ""}
              onChange={(e) => setSongName(e.target.value)}
            ></input>
            <input
              className="input-field"
              type="text"
              placeholder={song?.artist}
              value={artistName || ""}
              onChange={(e) => setArtistName(e.target.value)}
            ></input>
            <input
              className="input-field"
              type="text"
              placeholder={song?.url}
              value={audioUrl || ""}
              onChange={(e) => setAudioUrl(e.target.value)}
            ></input>
            <input
              className="input-field"
              type="text"
              placeholder={song?.imgUrl ? song.imgUrl : "No artwork URL"}
              value={artworkUrl || ""}
              onChange={(e) => setArtworkUrl(e.target.value)}
            ></input>
            <input
              className="input-field"
              type="text"
              placeholder={song?.genre ? song.genre : "No set genre"}
              value={genre || ""}
              onChange={(e) => setGenre(e.target.value)}
            ></input>
            <input
              className="input-field"
              type="text"
              placeholder={`UID: ${song?.userId}`}
              value={userId || ""}
              onChange={(e)=> setUserId(e.target.value)}
            ></input>
            <button
              type="submit"
              className="border-2 bg-gray-500 p-2 rounded-md"
            >
              Submit Changes
            </button>
          </form>
        </div>
      ) : (
        <div>You are not authorized to view this content</div>
      )}
    </>
  );
}
