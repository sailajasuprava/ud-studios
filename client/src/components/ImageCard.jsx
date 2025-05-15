function ImageCard({ image }) {
  const {
    urls: { full },
    description,
  } = image;

  return (
    <div>
      <img
        src={full}
        alt={description}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default ImageCard;
