import Link from "next/link";
const SideModal = ({ show }) => {
  return (
    <div style={{
        transform: show ? "translateY(0%)" : "translateY(-200%)",
      }} className="absolute flex flex-col justify-around bg-slate-600 w-[100px] h-[160px] p-3 pt-2 rounded-br-md transition-all duration-300 ease-in-out transform z-[0]">
        <Link className="hover:text-zinc-300" href="/">Home</Link>
        <Link className="hover:text-zinc-300" href="/listen">Listen</Link>
        <Link className="hover:text-zinc-300" href="/browse">Browse</Link>
        <Link className="hover:text-zinc-300" href="/submit">Upload</Link>
    </div>
  );
}

export default SideModal;
