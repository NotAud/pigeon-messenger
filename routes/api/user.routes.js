const router = require("express").Router();
const {
  createUser,
  getProfile,
  updateProfile,
} = require("../../api/user.api.js");

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const response = await createUser(token, req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.patch("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const response = await updateProfile(token, req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

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
