import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p className="text-justify">
            MediTrack Medical Center is a modern healthcare facility committed to delivering reliable, patient-centric medical services with precision and care. Our team of experienced doctors and healthcare professionals focuses on accurate diagnosis, efficient treatment, and continuous patient monitoring. At MediTrack, we combine medical expertise with smart healthcare management to ensure seamless, transparent, and high-quality care throughout your health journey.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;