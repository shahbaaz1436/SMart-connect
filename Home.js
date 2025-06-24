import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h2>Welcome to Saptaswara Music Academy</h2>
        <h3>SMART Connect</h3>
        <p>Discover the joy of music with our expert instructors</p>
      </section>
      <section className="features">
        <div className="feature">
          <h3>Expert Faculty</h3>
          <p>Learn from the best in the industry</p>
        </div>
        <div className="feature">
          <h3>Comprehensive Courses</h3>
          <p>From beginner to advanced levels</p>
        </div>
        <div className="feature">
          <h3>Performance Opportunities</h3>
          <p>Showcase your talent regularly</p>
        </div>
      </section>
    </div>
  );
};

export default Home;