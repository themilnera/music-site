"use client";
import { useState, useContext } from "react";
import { authContext } from "../auth-context";
import Link from "next/link";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaSearch } from "react-icons/fa";
import SideModal from "./SideModal";
import SearchBar from "./SearchBar";

const Title = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useContext(authContext);

  const toggleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <>
      <div className="relative flex justify-left lg:h-[7vh] sm:h-[9vh] bg-zinc-700 border-2 border-zinc-600 z-10">
        <button onClick={toggleShowSidebar} className="mr-2 ml-2">
          <TfiAlignJustify className="size-8" />
        </button>
        <Link href="/" className="lg:text-2xl sm:text-sm title lg:mt-3 sm:mt-7 ml-1">
          Underground Radio
        </Link>
        <Link href="/search">
          <FaSearch className="size-5 lg:mt-4 ml-5 mr-4 sm:mt-6" />
        </Link>
        {!user ? <Link href="/login" className="ml-auto mr-7 mt-4">
            Login
            </Link>
            :
            <Link href="/logout" className="ml-auto mr-7 mt-4">
            Logout {user.email}
            </Link>
            }
            
      </div>

      <SideModal show={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
};

export default Title;
