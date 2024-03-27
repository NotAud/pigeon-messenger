const router = require("express").Router();
const { createUser } = require("../../api/user.api.js");

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const chatroomData = await createUser(token, req.body);
    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
