const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("API working");
});

// 1️⃣ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ab")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 2️⃣ User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", UserSchema);

// 3️⃣ Register API
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({ success: false, error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });

  return res.json({ success: true, message: "User registered successfully" });
});

// 4️⃣ Login API
app.post("/login", async (req, res) => {
  console.log("runs");

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ success: false, error: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.json({ success: false, error: "Wrong password" });

  const token = jwt.sign({ id: user._id, email: user.email }, "mySecretKey123");

  return res.json({ success: true, token });
});

// Start Server
app.listen(5000, () => console.log("Server running on 5000"));
