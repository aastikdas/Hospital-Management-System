import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="who-we-are" />
        </div>
        <div className="banner">
          <p>About Us</p>
          <h3>Who We Are</h3>
          <p>
            MediTrack Medical Center is a modern healthcare institution focused on
            delivering accurate, reliable, and patient-centric medical services.
            We believe in combining clinical expertise with efficient digital
            systems to improve patient care and hospital management.
          </p>
          <p>
            Our mission is to provide timely diagnosis, transparent treatment
            processes, and continuous monitoring for better health outcomes.
          </p>
          <p>
            MediTrack is built with a strong foundation in modern medical
            practices and smart healthcare technology, ensuring seamless
            coordination between doctors, patients, and administrative staff.
          </p>
          <p>
            From appointment scheduling to medical records and treatment
            tracking, our platform is designed to enhance efficiency while
            maintaining compassion and trust in healthcare delivery.
          </p>
          <p>
            We are committed to innovation, ethical medical practices, and
            personalized care for every patient.
          </p>
          <p>Your health, our responsibility.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
