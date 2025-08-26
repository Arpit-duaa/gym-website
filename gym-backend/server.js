const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"arpitdua",
    database:"gym"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log(" Connected to MySQL");
});


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) return res.status(401).json({ error: "Invalid password" });

    res.json({ message: "Login successful!", user: { id: user.id, username: user.username } });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



