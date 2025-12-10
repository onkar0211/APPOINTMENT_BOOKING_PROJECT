const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Dummy credentials example (replace with DB later)
  if (email === "test@gmail.com" && password === "123456") {
    return res.json({ success: true, token: "dummy.jwt.token" });
  } else {
    return res.json({ success: false, error: "Invalid email or password" });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
