// backend/server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 4000;

// CORS setup to allow frontend (React) to access backend
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    const token = "FAKE-TOKEN-123456";
    res.cookie("auth_token", token, {
      httpOnly: false, // Intentional vulnerability: httpOnly should be true
      sameSite: "Lax"
    });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`✅ Auth backend running at http://localhost:${port}`);
});
