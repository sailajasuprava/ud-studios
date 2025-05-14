import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth, fetchUser } = useAuth();

  const logout = async () => {
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      setAuth(null);
    } catch (err) {
      console.log(err.message);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const res = await axios.post(`/searches`);
        setImages(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (auth) fetchImages();
  }, [auth]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex justify-end p-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
      <div className="w-full p-5 grid grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Home;
