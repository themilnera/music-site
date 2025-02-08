"use client";
import { useContext, useState } from "react";
import { songContext } from "../song-context";
import { authContext } from "../auth-context";
import { useRouter } from "next/navigation";

const Submit = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [artworkUrl, setArtworkUrl] = useState("");
  const [genre, setGenre] = useState("");

  const { user } = useContext(authContext);

  const { addSong } = useContext(songContext);

  const router = useRouter();

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
    try {
      const songId = await addSong(newSong);
      //addSong should now return the document id so we can push to the page
      
      setSongName("");
      setArtistName("");
      setAudioUrl("");
      setGenre("");
      setArtworkUrl("");
      console.log("song submitted");
      router.push(`listen/${songId}`);
      
    } catch (error) {
      console.error("error submitting song: ", error);
    }
  };
  if (!user) {
    router.push("/login");
  }

  //need to be logged in first
  return (
    <div>
      <div className="flex justify-center mt-5">
        At this time submissions need to be Archive.org links
      </div>
      <div className="flex justify-center items-center h-[80vh]">
        <form
          name="song_submission"
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <input
            id="song-name"
            type="text"
            placeholder="Song's Name"
            required
            className="input-field"
            value={songName || ""}
            onChange={(e) => setSongName(e.target.value)}
          ></input>
          <input
            id="artist-name"
            type="text"
            placeholder="Artist's Name"
            required
            className="input-field"
            value={artistName || ""}
            onChange={(e) => setArtistName(e.target.value)}
          ></input>
          <input
            id="url"
            type="text"
            placeholder="URL to audio file (ie .mp3)"
            required
            className="input-field"
            value={audioUrl || ""}
            onChange={(e) => setAudioUrl(e.target.value)}
          ></input>
          <input
            id="genre"
            type="text"
            placeholder="Genre (don't know? Put 'any')"
            required
            className="input-field"
            value={genre || ""}
            onChange={(e) => setGenre(e.target.value)}
          ></input>
          <input
            id="artworkUrl"
            type="text"
            placeholder="Artwork URL (optional)"
            className="input-field"
            value={artworkUrl || ""}
            onChange={(e) => setArtworkUrl(e.target.value)}
          ></input>
          <button
            type="submit"
            className="border-2 border-gray-400 bg-slate-500 hover:bg-slate-600 rounded-md w-[50%] mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
