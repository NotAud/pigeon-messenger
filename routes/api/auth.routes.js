const router = require("express").Router();
const { Auth } = require("../../models/index.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide a username, password, and display name",
    });
  }

  const verifyUsername = await Auth.findOne({ where: { username } });
  if (verifyUsername) {
    return res.status(400).json({ message: "Username already exists" });
  }

  try {
    const userID = uuidv4();
    bcrypt.hash(password, 10).then((hash) => {
      const user = new Auth({
        id: userID,
        username,
        password: hash,
      });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User created" });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Auth.findOne({ where: { username } });
  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const jwtToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  return res.status(200).json({
    access_token: jwtToken,
    user_id: user.id,
  });
});

module.exports = router;
