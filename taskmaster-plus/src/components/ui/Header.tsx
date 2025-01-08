export default function Header() {
  return (
    <nav className="max-w-full bg-[#C80036] flex flex-row justify-between">
      <h1 className="text-4xl select-none font-bold m-8 text-[#FFF5E1]">
        TaskMaster+
      </h1>
      <button
        type="button"
        className="text-[#FFF5E1] font-bold m-8 px-4 border-2 border-[#FFF5E1] rounded hover:scale-110 duration-100"
      >
        Login
      </button>
    </nav>
  );
}
