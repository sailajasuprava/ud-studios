import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [history, setHistory] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/searches`, { term, userId: auth.oauthID });
      setImages(res.data.data);
      setHistory((prev) => [res.data.newTerm, ...prev]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/searches/history");
        setHistory(res.data.data);
      } catch (err) {
        console.error("Error fetching history:", err.message);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const res = await axios.get("/searches/top-searches", {
          withCredentials: true,
        });
        setTopSearches(res.data.data);
      } catch (err) {
        console.error("Failed to fetch top searches", err);
      }
    };

    fetchTopSearches();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        images,
        setImages,
        isLoading,
        setIsLoading,
        term,
        setTerm,
        handleSubmit,
        history,
        topSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("SearchContext used outside of provider.");
  return context;
}

export default SearchProvider;
