import { useAuth } from "../context/AuthContext";
import { useSearchContext } from "../context/SearchContext";

function NavBar() {
  const { logout } = useAuth();
  const { handleSubmit, term, setTerm } = useSearchContext();

  return (
    <div className="flex justify-end p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-md mx-auto my-4"
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search images..."
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          Search
        </button>
      </form>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}

export default NavBar;
