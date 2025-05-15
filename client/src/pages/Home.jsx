import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { useSearchContext } from "../context/SearchContext";

function Home() {
  const { auth, fetchUser } = useAuth();
  const { images, isLoading } = useSearchContext();
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   async function fetchImages() {
  //     try {
  //       setIsLoading(true);
  //       const res = await axios.post(`/searches`, {
  //         term: "office",
  //         userId: auth.oauthID,
  //       });
  //       setImages(res.data.data);
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   if (auth) fetchImages();
  // }, [auth]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <NavBar />
      <div className="max-w-5xl mx-auto p-5 grid grid-cols-4 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Home;
