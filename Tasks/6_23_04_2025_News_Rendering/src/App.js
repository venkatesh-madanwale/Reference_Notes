import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Cards";
import NewsDetail from "./NewsDetail";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    axios
      .get("https://saurav.tech/NewsAPI/everything/cnn.json")
      .then((res) => {
        setData(res.data.articles);
        // console.log(res.data.articles);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Handle click on card
  const handleCardClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Register</a>
      </div>

      
      {selectedArticle ? (
        <NewsDetail article={selectedArticle} />
      ) : (
        <div className="con">
          {data.map((article, index) => (
            <Card
              key={index}
              article={article}
              onClick={() => handleCardClick(article)}
            />
          ))}
        </div>
      )}

      <footer>
        <p>&copy; 2025 Your Website. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
