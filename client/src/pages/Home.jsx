import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { useSearchContext } from "../context/SearchContext";
import Sidebar from "../components/Sidebar";

function Home() {
  const { fetchUser } = useAuth();
  const { images, isLoading, term } = useSearchContext();
  const [selectedImages, setSelectedImages] = useState([]);
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelect = (imageId) => {
    setSelectedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };
  console.log(images);

  if (isLoading) return <Spinner />;

  return (
    <>
      <NavBar />

      <div className="grid grid-cols-2 min-h-screen">
        <Sidebar />

        {images.length > 0 && (
          <main className="space-y-6 p-6">
            <h1 className="text-center text-3xl font-semibold">
              "You searched for {term}' - {images.length} results."
            </h1>

            <p className="text-xl font-medium text-center">
              Selected: {selectedImages.length}{" "}
              {selectedImages.length === 1 ? "image" : "images"}
            </p>

            <div className="max-w-5xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <input
                    type="checkbox"
                    className="absolute top-2 left-2 w-5 h-5 z-10 accent-blue-500"
                    checked={selectedImages.includes(image.id)}
                    onChange={() => toggleSelect(image.id)}
                  />
                  <ImageCard image={image} />
                </div>
              ))}
            </div>
          </main>
        )}
      </div>
    </>
  );
}

export default Home;
