const router = require("express").Router();
const { getChatrooms } = require("../api/chatrooms.api.js");

router.get("/", async (req, res) => {
  const chatroomData = await getChatrooms();
  res.render("chatrooms", { chatrooms: chatroomData });
});

module.exports = router;
