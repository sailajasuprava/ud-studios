import { useEffect } from "react";
import Spinner from "../components/Spinner";
import ImageCard from "../components/ImageCard";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import { useSearchContext } from "../context/SearchContext";

function Home() {
  const { fetchUser } = useAuth();
  const { images, isLoading, term } = useSearchContext();
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <NavBar />

      {images.length > 0 && (
        <main>
          <h1 className="text-center text-3xl font-semibold">
            "You searched for {term}' - {images.length} results."
          </h1>
          <div className="max-w-5xl mx-auto p-5 grid grid-cols-4 gap-4">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default Home;
