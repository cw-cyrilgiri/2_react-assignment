import './ImageCarousel.css';
import placeholderImage from '../../assets/placeholder.svg';
import { useState } from 'react';

function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length)
    return <img className="carousel-image" src={placeholderImage} />;

  const prev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const next = () => {
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
  };

  return (
    <div className="carousel">
      <img
        src={images[currentIndex]}
        alt={`car-${currentIndex}`}
        className="carousel-image"
        loading="lazy"
      />

      {currentIndex > 0 && (
        <button className="carousel-btn left" onClick={prev}>
          ‹
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button className="carousel-btn right" onClick={next}>
          ›
        </button>
      )}
    </div>
  );
}

export default ImageCarousel;
