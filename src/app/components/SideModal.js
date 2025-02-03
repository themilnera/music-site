import Link from "next/link";
const SideModal = () => {
  return (
    <div className="absolute flex flex-col justify-around bg-slate-600 w-[8vw] h-[20vh] p-3 pt-2 rounded-br-md">
        <Link href="/">Home</Link>
        <Link href="/listen">Listen</Link>
        <Link href="/submit">Submissions</Link>
    </div>
  )
}

export default SideModal;
