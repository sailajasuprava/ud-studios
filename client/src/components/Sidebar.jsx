import { useSearchContext } from "../context/SearchContext";

function Sidebar() {
  const { history } = useSearchContext();
  console.log(history);

  return (
    <aside className=" bg-gray-200  px-5 pt-36 rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Search History</h2>
      <ul className="text-sm space-y-2">
        {history.length > 0 ? (
          history.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span className="font-semibold">{item.term}</span>
              <span className="text-gray-500 text-xs">
                {new Date(item.createdAt).toLocaleString()}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No history yet.</li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
