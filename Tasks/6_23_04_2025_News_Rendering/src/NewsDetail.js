import React from "react";
import "./NewsDetail.css";

function NewsDetail({ article }) {
  const { title, content, urlToImage, author, publishedAt, url } = article; // Destructure article properties

  return (
    <div className="news-detail">
      <div className="news-header">
        <h1>{title}</h1>
        <p className="author">By {author || "Unknown"}</p>
        <p className="date">{new Date(publishedAt).toLocaleDateString()}</p>
      </div>
      <div className="news-image">
        <img src={urlToImage || "https://via.placeholder.com/800x400"} alt={title} />
      </div>
      <div className="news-content">
        <p>{content}</p>
      </div>
      <div className="news-link">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read full article
        </a>
      </div>
    </div>
  );
}

export default NewsDetail;
