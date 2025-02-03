"use client"
import { useState } from "react";
import Link from "next/link";
import { TfiAlignJustify } from "react-icons/tfi";
import { FaSearch } from "react-icons/fa";
import SideModal from "./SideModal";
import SearchBar from "./SearchBar";

const Title = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const toggleShowSidebar = () =>{
        setShowSidebar(!showSidebar);
    }
    const toggleShowSearch = ()=>{
        setShowSearch(!showSearch);
    }
  return (
    <>
    <div className="relative flex justify-left h-[6vh] bg-zinc-700 border-2 border-zinc-600">
            <button onClick={toggleShowSidebar} className="mr-2 ml-2"><TfiAlignJustify className="size-8"/></button>
      <Link href="/" className="text-2xl title mt-2 ml-10">
        Underground Radio
      </Link>
      {showSearch? <SearchBar/>: <button className="ml-10 mb-1" onClick={toggleShowSearch}><FaSearch className="size-5"/></button>}
      <Link href="/login" className="ml-auto mr-5 mt-3">Login</Link>
    </div>

   {showSidebar && <SideModal onClose={()=> setShowSidebar(false)}/>}
    </>
  );
};

export default Title;