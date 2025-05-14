import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

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
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        console.log(res.data.user);
        setAuth(res.data.user);
      } catch (err) {
        setAuth(null);
        console.log(
          "User not authenticated",
          err?.response?.data?.message || err.message
        );
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      try {
        if (!auth) navigate("/login");
        setIsLoading(true);
        const res = await axios.post(`/searches`);
        setImages(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (isLoading) return <Spinner />;
  if (!auth) navigate("/login");

  return (
    <div>
      <div>
        <button onClick={logout}>Log Out</button>
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
