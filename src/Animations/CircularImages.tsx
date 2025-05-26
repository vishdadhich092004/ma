import React, { useState, useEffect } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1610872817784-5b164d9ae6e5",
  },
  {
    src: "https://images.unsplash.com/photo-1636631504829-15d682bd7d39",
  },
  {
    src: "https://images.unsplash.com/photo-1582696532633-628289319654",
  },
  {
    src: "https://images.unsplash.com/photo-1617882422083-0345a9c72716",
  },
];

const CircularImages: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);
  const displayImages = images.slice(0, 4);
  return (
    <div className="relative flex items-center justify-center w-[400px] h-[400px] my-50">
      <div className="w-[400px] h-[400px] bg-gray-400 rounded-full absolute" />
      {displayImages.map((image, index) => {
        const angle = ((index - currentIndex + 4) % 4) * 90;
        return (
          <div
            key={index}
            className="absolute w-[300px] h-[300px] origin-center flex items-center justify-center transition-transform duration-1000"
            style={{
              transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
            }}
          >
            <img
              src={image.src}
              alt={`Circular image ${index + 1}`}
              className={`object-cover rounded-lg border-3 border-white shadow-lg cursor-pointer ${
                currentIndex === (index + 1) % 4
                  ? "w-[350px] h-[350px]"
                  : "w-[200px] h-[200px]"
              } transition-all duration-1000`}
              onClick={() => {
                setCurrentIndex(index);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CircularImages;
