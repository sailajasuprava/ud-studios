import { useAuth } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";

function NavBar() {
  const { logout } = useAuth();
  const { handleSubmit, term, setTerm, topSearches } = useSearchContext();
  console.log(topSearches);

  return (
    <header className="fixed w-full z-[100] ">
      <div className="flex justify-between bg-gray-100 p-4 ">
        <h1 className="text-2xl font-bold">Unsplash API</h1>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search images..."
            className="px-4 py-2 rounded-l-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-sky-500 text-white rounded-r-md hover:bg-sky-600 transition duration-200"
          >
            Search
          </button>
        </form>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 cursor-pointer rounded hover:bg-gray-600 duration-300"
        >
          Log Out
        </button>
      </div>

      <div className="text-center p-4 bg-black text-white">
        Top Searches:&nbsp;
        {topSearches.map((s, i) => (
          <span
            key={i}
            className="px-4 py-1 text-sm mr-2 rounded-md border cursor-pointer transition"
          >
            {s._id}
          </span>
        ))}
      </div>
    </header>
  );
}

export default NavBar;
