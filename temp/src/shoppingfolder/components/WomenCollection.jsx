import React from 'react';
import './Collections.css';

const WomenCollection = (props) => {
  const { title, image1, image2, image3, image4, image5, image6 } = props.ladiesfashion;

  const images = [image1, image2, image3, image4, image5, image6];

  return (
    <div className="collectionSection">
      <h2>{title}</h2>

      <div className="bannerbox">
        <img src="Assets/LadiesBanner.gif" alt="banner" />
      </div>

      <div className="carousel">
        <div className="carousel-track">
          {images.concat(images).map((src, index) => (
            <img key={index} src={src} alt={`Ladies Fashion ${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomenCollection;
