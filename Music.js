import React from 'react';

const Music = () => {
  const videos = [
    { id: 'dQw4w9WgXcQ', title: 'Student Performance 2023' },
  ];

  return (
    <div className="music">
      <h2>Our Music Collection</h2>
      <div className="video-grid">
        {videos.map(video => (
          <div key={video.id} className="video-item">
            <h3>{video.title}</h3>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/z77CqAbw10w?si=nlBvkh7Y-y86nHyg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/cSY2WsTKCVU?si=-PwoPJOP3qND6yDo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            {/* <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;