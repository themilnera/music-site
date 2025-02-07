"use client";
import { useParams } from "next/navigation";
import AudioPlayer from "@/app/components/AudioPlayer";
import { useContext, useState, useEffect } from "react";
import { songContext } from "@/app/song-context";

const Listen = () => {
  const params = useParams();
  const id = params.id;
  const contextRef = useContext(songContext);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSong = async () => {
    try {
      const s = await contextRef.getSong(id);
      setSong(s);
    } catch (error) {
      console.error("failed to get song", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSong();
  }, [id]);
  //   the 2nd param is a dependency, useEffect will run when
  //   the component mounts or the id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div className="flex justify-center">
      <AudioPlayer song={song} />
    </div>
  );
};

export default Listen;
