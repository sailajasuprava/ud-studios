import { useAuth } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";

function NavBar() {
  const { logout } = useAuth();
  const { handleSubmit, term, setTerm } = useSearchContext();

  return (
    <header className="flex justify-between p-6">
      <h1 className="text-2xl font-bold">Unsplash API</h1>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search images..."
          className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
    </header>
  );
}

export default NavBar;
