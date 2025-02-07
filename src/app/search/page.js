"use client";

import { useState, useContext } from "react";
import SearchBar from "../components/SearchBar";
import { songContext } from "../song-context";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const { searchSongs } = useContext(songContext);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setCurrentPage(1);

      const { results, hasMore } = await searchSongs(searchTerm);
      setResults(results || []);
      setHasMore(hasMore);
    } catch (error) {
      console.error("failed to search", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = async (page) => {
    setLoading(true);
    try {
      const { results, hasMore } = await searchSongs(searchTerm, page);
      setResults(results || []);
      setHasMore(hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error("failed to load more", error);
      setResults([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center"
      >
        <input
          type="text"
          placeholder="Search for a song"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-3 ml-5 rounded-md border-2 border-gray-400 text-black pt-1 pb-1 pl-2 mr-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="border-2 border-blue-400 rounded-md p-1 mt-3"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-6 ml-10 mr-10 flex flex-row flex-wrap">
        {results.map((song) => (
          <a
            key={song.id}
            className="text-blue-800 block"
            href={`/listen/${song.id}`}
          >
            <div className="text-center flex flex-col items-center ml-3 mr-3 border-2 text-blue-200 rounded-md p-2 min-w-60 max-w-60 min-h-60 max-h-60">
              <h3 className="text-cyan-200 text-xl">{song.name}</h3>
              <p>{song.artist}</p>

              {song.imgUrl ? (
                <img src={song.imgUrl} className="w-[100px] h-[100px]" />
              ) : (
                <img
                  src="https://images.pexels.com/photos/4734715/pexels-photo-4734715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="w-[100px] h-[100px]"
                />
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          <GrLinkPrevious/>
        </button>
        <span className="p-2">Page {currentPage}</span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={!hasMore || loading}
          className="p-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          <GrLinkNext/>
        </button>
      </div>
    </div>
  );
};

export default Search;
