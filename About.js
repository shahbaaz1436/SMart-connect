import React from 'react';

const About = () => {
  return (
    <div className="about">
     
        <h2>About Our Academy</h2>
        <p>
          Founded in 2000, Music Academy has been nurturing musical talent with a 
          comprehensive curriculum and personalized attention. Our mission is to 
          make quality music education accessible to all.
        </p>

      <section className="principal">
        <h2>Our Principal</h2>
        <div className="principal-info">
          <img src="./sir.jpg"width={150} alt="Principal" />
          <div>
            <h3>Md. Layak Ahmed</h3>
            <p>
              With over 25 years of experience in music education, Md. Layak Ahmed 
              has trained numerous award-winning musicians. He holds a PhD in 
              Musicology from Juilliard School.
            </p>
          </div>
        </div>
      </section>
      <section className="facilities">
        <h2>Our Facilities</h2>
        <ul>
          <li>Vocal</li>
          <li>Violin  </li>
          {/* <li>Performance auditorium</li>
          <li>Extensive music library</li> */}
        </ul>
      </section>
    </div>
  );
};

export default About;