// server.js
const express = require("express");
const mysql   = require("mysql");
const cors    = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "",
  database: "signup"
});

// → Connect to MySQL and log any errors:
db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    process.exit(1);
  }
  console.log("✔️  Connected to MySQL");
});

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (name,email,password) VALUES (?,?,?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

