import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-lg mt-10 mb-20">Welcome to <p className="text-red-400 text-xl mt-5">Underground Radio</p></h1>
      <img className="size-1/4 rounded-sm" src="https://images.pexels.com/photos/579471/pexels-photo-579471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
      <p className="mt-5 w-[30vw]">The goal of this site is to be a place for discovering music made by unknown artists</p>
      <Link href="/listen" className="text-gray-400 border-2 border-orange-500 rounded-md bg-red-800 p-2 mt-5 hover:bg-red-700 hover:text-gray-300">Click here to listen to the radio</Link>
    </div>
  );
}

