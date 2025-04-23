import React, { useState } from "react";
import "./App.css";

function App() {
  const [amt, setamt] = useState(0);
  const [cv, setCv] = useState(80);
  const [res, setres] = useState("");

  const cur = (e) => {
    setCv(e.target.value);
    setres(amt / e.target.value);
  };

  const con = (e) => {
    setamt(e.target.value);
    if (e.target.value === "") {
      setres("");
    } else {
      setres(e.target.value / cv);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">💱 Currency Converter</div>
        <ul className="navbar-menu">
          <li>Home</li>
          <li>Rates</li>
          <li>About</li>
        </ul>
      </nav>

      {/* Inputs */}
      <input type="text" onChange={con} placeholder="Enter amount" />
      <select onChange={cur}>
        <option value={80}>Dollar</option>
        <option value={40}>Euro</option>
        <option value={18}>Rubble</option>
        <option value={4}>Yen</option>
        <option value={0.1}>Nepali_Rupee</option>
      </select>

      {/* Result */}
      <div className="result">{res}</div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Currency Converter App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
