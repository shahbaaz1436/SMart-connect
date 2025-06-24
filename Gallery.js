import React, { useState, useEffect,useRef} from 'react';
// import './Gallery.css'; // Add this for styling if needed

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();

  const images = [
    './image1.jpg',
    './image2.jpg',
    './image3.jpg',
    './image4.jpg',
    // './image5.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  });

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="gallery-container"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)'
      }}
    >
      {/* <h2 style={{ textAlign: 'center', margin: '10px 0' }}>Our Gallery</h2> */}

      <div
        className="slideshow"
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`
        }}
        ref={slideRef}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              width: `${100 / images.length}%`,
              flexShrink: 0,
              height: '400px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: 0,
                right: 0,
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: 'white',
                padding: '10px'
              }}
            >
              <h3>Music Academy Performance {index}</h3>
            </div> */}
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          width: '40px',
          height: '40px'
        }}
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          borderRadius: '50%',
          width: '40px',
          height: '40px'
        }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Gallery;