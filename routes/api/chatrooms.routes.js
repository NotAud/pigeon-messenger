const router = require("express").Router();
const { getChatrooms } = require("../../api/chatrooms.routes.js");

router.get("/", async (req, res) => {
  try {
    const chatroomData = await getChatrooms();
    res.status(200).json(chatroomData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
