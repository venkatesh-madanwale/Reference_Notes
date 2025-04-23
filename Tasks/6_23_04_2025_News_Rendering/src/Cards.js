import React from "react";
import "./Card.css"; // Assuming you have custom styles for the Card component.

function Card({ article, onClick }) {
  const { title, description, urlToImage, author } = article; // Destructure article properties

  return (
    <div className="card" onClick={onClick}>
      <div className="img">
        <img src={urlToImage || "https://via.placeholder.com/500x350"} alt={title} />
      </div>
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="Aut">By {author || "Unknown"}</p>
      </div>
    </div>
  );
}

export default Card;
