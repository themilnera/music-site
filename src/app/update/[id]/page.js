"use client";
import { useParams } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { authContext } from "@/app/auth-context";
import { songContext } from "@/app/song-context";

export default function Update() {
  const params = useParams();
  const id = params.id;
  const { user, getUserDoc } = useContext(authContext);
  const { getSong, updateSong } = useContext(songContext);
  const [userRole, setUserRole] = useState("user");
  const [song, setSong] = useState("");

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

//   useEffect(() => {
//     const fetchCurrentSong = async () => {
//       try {
//         const s = await getSong(id);
//         setSong(s);
//       } catch (error) {
//         console.error("Failed to fetch current song", error);
//       }
//     };
//     fetchCurrentSong();
//   }, [song]);

  //fetch song info, and populate the fields with current song info
  //add form so when you submit you submit an edit,
  //redirect back to the now edited song page

  return (
    <>
      {userRole === "admin" ? (
        <div>
          admin
          <input type="text" placeholder=""></input>
        </div>
      ) : (
        <div>You are not authorized to view this content</div>
      )}
    </>
  );
}
