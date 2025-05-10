import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";

function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        const res = await axios.post(`/v1/searches`);
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

  return (
    <div className="w-full p-5 grid grid-cols-3 gap-4">
      {images.map((image) => (
        <ImageCard key={image.id} />
      ))}
    </div>
  );
}

export default Home;
