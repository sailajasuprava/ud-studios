function ImageCard({ image }) {
  const {
    urls: { full },
    description,
  } = image;

  return (
    <div className="">
      <div>
        <img
          src={full}
          alt={description}
          className="h-full w-full object-contain"
        />
      </div>
      <div>ImageCard</div>
    </div>
  );
}

export default ImageCard;
