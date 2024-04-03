const router = require("express").Router();
const {
  createUser,
  getProfile,
  updateProfile,
} = require("../../api/user.api.js");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const response = await createUser(token, req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user profile
router.patch("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const response = await updateProfile(token, req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get a user profile
router.get("/:userID", async (req, res) => {
  try {
    if (!req.params.userID) {
      throw { message: "Missing required fields" };
    }

    const response = await getProfile({ user_id: req.params.userID });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
