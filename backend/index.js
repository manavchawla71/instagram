const express = require("express");
const cors = require("cors");

const users = [];

const posts = [];
const app = express();
// Get all posts
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.get("/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/posts", (req, res) => {
  const { username, image, caption } = req.body;
  if (!username || !image) {
    return res.status(400).json({ message: "Username and image are required" });
  }
  const post = {
    id: posts.length + 1,
    username,
    image,
    caption: caption || "",
    createdAt: new Date().toISOString(),
  };
  posts.unshift(post); // add to start for newest first
  res.status(201).json({ message: "Post created", post });
});

// Middleware to parse JSON bodies
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if user already exists
  const userExists = users.some(
    (user) => user.username === username || user.email === email
  );
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }
  users.push({ username, email, password });
  res.status(200).json({ message: "User registered successfully" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  res.status(200).json({ message: "Login successful" });
});
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
